# ⚠️ IMPORTANT: JWT_SECRET Configuration Required

Your backend server is currently failing to start because the `JWT_SECRET` in your `.env` file is too short (17 characters, minimum 32 required).

## Quick Fix

1. Open your `.env` file in the `backend` folder
2. Replace the current `JWT_SECRET` value with this secure one:

```
JWT_SECRET=c03115520eeb52dbeb6204290b0d97aaedb429c17f3
```

## Complete .env File Template

Your `.env` file should look like this:

```env
# Database Connection
MONGO_URI=your_mongodb_connection_string_here

# JWT Secret (MUST be at least 32 characters)
JWT_SECRET=c03115520eeb52dbeb6204290b0d97aaedb429c17f3

# CORS - Allowed Origins (comma-separated for multiple)
CLIENT_URL=http://localhost:5173,http://localhost:3000

# Environment
NODE_ENV=development

# Port (optional, defaults to 5000)
PORT=5000
```

## For Production Deployment (Render.com)

Set these environment variables in your Render dashboard:

1. **JWT_SECRET**: `c03115520eeb52dbeb6204290b0d97aaedb429c17f3` (or generate a new one)
2. **MONGO_URI**: Your MongoDB Atlas connection string
3. **CLIENT_URL**: Your production frontend URL (e.g., `https://prits-it-solutions.onrender.com`)
4. **NODE_ENV**: `production`

## Generate New JWT Secret (Optional)

If you want to generate a different secret, run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

**After updating the .env file, restart the server with:**
```bash
npm start
```
