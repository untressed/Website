# Environment Setup Guide

## Quick Setup for Production/Global Server

### 1. Frontend Configuration (`pritsreact/.env`)

Create a file named `.env` in the `pritsreact` folder:

**For Production Server:**
```env
VITE_API_URL=https://your-backend-domain.com
```

**For Local Development:**
```env
VITE_API_URL=http://localhost:5000
```

> **Important:** After creating or modifying `.env`, you MUST restart the dev server:
> ```bash
> # Stop the current server (Ctrl+C)
> npm run dev
> ```

---

### 2. Backend Configuration (`backend/.env`)

Your backend `.env` should already exist. Make sure it has:

**For Production:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pritsdb
JWT_SECRET=your_strong_secret_key
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

**For Local Development:**
```env
MONGO_URI=mongodb://localhost:27017/pritsdb
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## Common Production Scenarios

### Scenario 1: Both Frontend & Backend on Same Domain
```env
# Frontend .env
VITE_API_URL=https://yourdomain.com

# Backend .env
CLIENT_URL=https://yourdomain.com
```

### Scenario 2: Separate Domains/Subdomains
```env
# Frontend .env
VITE_API_URL=https://api.yourdomain.com

# Backend .env
CLIENT_URL=https://app.yourdomain.com
```

### Scenario 3: Using Vercel/Netlify + Railway/Render
```env
# Frontend .env (Vercel/Netlify)
VITE_API_URL=https://your-backend.railway.app

# Backend .env (Railway/Render)
CLIENT_URL=https://your-app.vercel.app
```

---

## Troubleshooting Login Issues

If you're getting "Server Error" during login:

1. ✅ **Check Backend is Running**: Visit `http://localhost:5000/api/auth/` or your production URL
2. ✅ **Verify CORS**: Make sure `CLIENT_URL` in backend `.env` matches your frontend URL
3. ✅ **Check Network Tab**: Open browser DevTools → Network → See the actual API URL being called
4. ✅ **Restart Servers**: After changing `.env` files, always restart both frontend and backend

---

## Current Status

- ✅ Backend is running and connected to MongoDB
- ✅ Database has users
- ⚠️ Frontend needs `.env` file with `VITE_API_URL`

**Next Step:** Create `pritsreact/.env` file with your server URL and restart the frontend.
