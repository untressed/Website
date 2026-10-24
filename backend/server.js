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

// Static files for Production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const fs = require('fs');
    const frontendDir = fs.existsSync(path.join(__dirname, '..', 'frontend', 'dist')) ? 'frontend' : 'pritsreact';
    const frontendPath = path.join(__dirname, '..', frontendDir, 'dist');
    console.log('📁 Serving static files from:', frontendPath);
    app.use(express.static(frontendPath));

    // Catch-all route for SPA - must be AFTER API routes
    app.get('*', (req, res) => {
        console.log('🔄 SPA fallback for:', req.url);
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
}

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown for Nodemon restarts
process.once('SIGUSR2', function () {
    server.close(function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
