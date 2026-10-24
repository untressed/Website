const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Environment validation
const missingVars = [];
if (!process.env.MONGO_URI) missingVars.push('MONGO_URI');
if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');

if (missingVars.length > 0) {
    console.warn(`⚠️ Warning: Missing environment variables: ${missingVars.join(', ')}`);
    console.warn("⚠️ Server will continue to start and serve static pages, but database operations require MONGO_URI in Render settings.");
}

// Fallback JWT_SECRET if not provided in environment
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'untressed_jwt_fallback_secret_key_2026';
}

// ============================================
// SECURITY MIDDLEWARE
// ============================================
const {
    securityHeaders,
    apiLimiter,
    sanitizeData,
    preventXSS
} = require('./middleware/securityMiddleware');

// Apply response compression (Gzip/Brotli) to speed up mobile transfers
try {
    const compression = require('compression');
    app.use(compression());
} catch (e) {
    // Graceful fallback if compression module is not installed locally
}

// Apply security headers (Helmet.js)
app.use(securityHeaders);

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize data to prevent NoSQL injection
app.use(sanitizeData);

// Prevent XSS attacks
app.use(preventXSS);

// CORS Configuration
const defaultOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174',
    'http://localhost:5500',
    'https://untressed.com',
    'https://www.untressed.com',
    'https://untressed.onrender.com',
    'https://website-kg8d.onrender.com',
    'https://prits-it-solutions.onrender.com',
    'https://pritsitsolutions.com',
    'https://www.pritsitsolutions.com'
];

// Parse CLIENT_URL from environment (can be comma-separated list)
const envOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(origin => origin.trim()) : [];
const allowedOrigins = [...defaultOrigins, ...envOrigins];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Apply general API rate limiting
app.use('/api/', apiLimiter);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// Database Connection
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB Connected'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
} else {
    console.warn('⚠️ MongoDB connection skipped: MONGO_URI is not set in Environment Variables.');
}

// Routes
// (Root route handled by static files in production)

// Import Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');

app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/promo', promoCodeRoutes);

// Static files for Production / SPA
const fs = require('fs');

const staticCandidates = [
    path.resolve(__dirname, '..', 'frontend', 'dist'),
    path.resolve(__dirname, 'frontend'),
    path.resolve(process.cwd(), '..', 'frontend', 'dist'),
    path.resolve(process.cwd(), 'frontend', 'dist'),
    path.resolve(process.cwd(), 'backend', 'frontend'),
    path.resolve(process.cwd(), 'frontend'),
];

const validStaticPaths = [];
for (const candidate of staticCandidates) {
    if (fs.existsSync(candidate) && !validStaticPaths.includes(candidate)) {
        validStaticPaths.push(candidate);
        app.use(express.static(candidate, {
            maxAge: '30d',
            setHeaders: (res, filePath) => {
                if (filePath.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
                } else if (/\.(js|css|webp|png|jpg|jpeg|svg|ico|woff2?)$/i.test(filePath)) {
                    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                }
            }
        }));
        app.use('/assets', express.static(path.join(candidate, 'assets'), {
            maxAge: '1y',
            immutable: true
        }));
    }
}

// Catch-all route for SPA - must be AFTER API routes and static handlers
app.get('*', (req, res) => {
    // If request looks like a static asset file (ends with an extension), do NOT return HTML
    if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot|map|json)$/i.test(req.path)) {
        return res.status(404).send('Asset not found');
    }

    // Serve index.html from first valid directory
    for (const validPath of validStaticPaths) {
        const indexPath = path.join(validPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            return res.sendFile(indexPath);
        }
    }
    res.status(404).send('Application bundle index.html not found. Please build the frontend.');
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown for Nodemon restarts
process.once('SIGUSR2', function () {
    server.close(function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
