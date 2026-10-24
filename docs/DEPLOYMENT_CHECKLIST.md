# Production Deployment Checklist for pritsitsolutions.com

## ✅ CORS Configuration - ALREADY DONE
Your domain is already configured in `backend/server.js`:
- ✅ `https://pritsitsolutions.com`
- ✅ `https://www.pritsitsolutions.com`

---

## 🔧 Required Configuration Steps

### 1. Backend Environment Variables

Ensure your **production backend** has these environment variables set:

```env
# MongoDB Connection (use MongoDB Atlas for production)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pritsdb

# JWT Secret (MUST be 32+ characters)
JWT_SECRET=your_very_long_and_secure_secret_key_here_minimum_32_chars

# Server Port
PORT=5000

# Node Environment
NODE_ENV=production

# Frontend URL (for CORS)
CLIENT_URL=https://pritsitsolutions.com,https://www.pritsitsolutions.com
```

### 2. Frontend Environment Variables

Create `pritsreact/.env.production` file:

```env
# Backend API URL
VITE_API_URL=https://pritsitsolutions.com
```

**OR** if your backend is on a separate subdomain/server:
```env
VITE_API_URL=https://api.pritsitsolutions.com
```

---

## 🚀 Deployment Steps

### Option A: Same Server (Backend + Frontend Together)

If both are hosted on the same domain:

1. **Build Frontend:**
   ```bash
   cd pritsreact
   npm run build
   ```

2. **Copy Build to Backend:**
   ```bash
   # The backend server.js already serves static files from 'pritsreact' folder
   # Just ensure the build files are in pritsreact/dist/
   ```

3. **Deploy Backend:**
   - Upload entire backend folder to your server
   - Ensure `.env` file is configured
   - Run: `npm start` or `node server.js`

### Option B: Separate Servers

**Frontend (Vercel/Netlify):**
1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com`

**Backend (Railway/Render/Heroku):**
1. Connect your GitHub repo
2. Set start command: `npm start`
3. Add all environment variables from step 1 above

---

## 🧪 Testing Checklist

After deployment, test these:

### 1. Backend Health Check
Visit: `https://pritsitsolutions.com/api/auth/` (or your backend URL)
- Should return 404 or "Cannot GET" (means server is running)

### 2. CORS Test
Open browser console on `https://pritsitsolutions.com` and run:
```javascript
fetch('https://your-backend-url.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### 3. Login Test
1. Go to your live site
2. Open DevTools → Console
3. Try to login
4. Check for errors

---

## 🐛 Troubleshooting

### Login shows "Server Error"

**Check Backend Logs** for these messages:

✅ **Good Signs:**
```
🌐 CORS Allowed Origins: [...]
✅ CORS: Allowing whitelisted origin: https://pritsitsolutions.com
🔐 Login attempt for email: user@example.com
✅ User found: user@example.com
```

❌ **Bad Signs:**
```
❌ CORS BLOCKED: Origin not in whitelist: https://some-other-url.com
```
**Fix:** Add the blocked URL to `CLIENT_URL` in backend `.env`

### Database Connection Error
```
❌ MongoDB Connection Error: authentication failed
```
**Fix:** Check `MONGO_URI` credentials in backend `.env`

### JWT Error
```
❌ CRITICAL ERROR: JWT_SECRET must be at least 32 characters
```
**Fix:** Use a longer JWT_SECRET (minimum 32 characters)

---

## 📋 Pre-Deployment Checklist

- [ ] Backend `.env` file configured with production values
- [ ] Frontend `.env.production` file created with `VITE_API_URL`
- [ ] MongoDB Atlas cluster created and connection string updated
- [ ] JWT_SECRET is 32+ characters long
- [ ] `NODE_ENV=production` set in backend
- [ ] Frontend built successfully (`npm run build`)
- [ ] Both domains (with and without www) in CORS allowed origins
- [ ] SSL certificates configured (https://)

---

## 🔒 Security Reminders

1. ✅ Never commit `.env` files to git
2. ✅ Use strong JWT_SECRET (32+ characters, random)
3. ✅ Use MongoDB Atlas (not local MongoDB) for production
4. ✅ Set `NODE_ENV=production` in production
5. ✅ Specify exact domains in `CLIENT_URL` (avoid wildcards)

---

## 📞 Need Help?

If login still fails after deployment:

1. **Check backend logs** - they now show detailed CORS and login information
2. **Check browser console** - look for CORS or network errors
3. **Verify URLs match exactly** - including https:// and www/non-www
4. **Test with curl** - see if backend is accessible

**Share with me:**
- Backend console logs when login fails
- Browser console errors
- Your exact frontend and backend URLs
