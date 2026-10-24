# 🚀 Quick Deployment Guide

## One-Command Deployment

To deploy your application to the live server, simply run:

```powershell
.\deploy-to-server.ps1
```

**That's it!** The script will automatically:
- ✅ Build your React frontend
- ✅ Package all necessary files
- ✅ Upload to your server (72.62.246.58)
- ✅ Install dependencies
- ✅ Restart the application

You'll be prompted for your SSH password 2-3 times during the process.

---

## What Gets Deployed

### Frontend (React + Vite)
- Built production bundle from `pritsreact/dist`
- Optimized and minified assets
- Environment: `VITE_API_URL=https://pritsitsolutions.com`

### Backend (Node.js + Express)
- All backend code and routes
- Production environment variables
- MongoDB Atlas connection
- Razorpay payment integration

---

## After Deployment

### 1. Test Your Live Site
Visit: **https://pritsitsolutions.com**

### 2. Verify Features
- [ ] Homepage loads correctly
- [ ] Login functionality works
- [ ] Dashboard displays data
- [ ] Job opportunities page works
- [ ] Payment integration functional

### 3. Check Server Logs (if needed)
```powershell
ssh root@72.62.246.58 'tail -f /var/log/prits-backend.log'
```

---

## Environment Configuration

### Production Settings (Already Configured ✅)

**Frontend** (`.env.production`):
```
VITE_API_URL=https://pritsitsolutions.com
```

**Backend** (`.env.production`):
```
PORT=5500
MONGO_URI=mongodb+srv://[your-credentials]
JWT_SECRET=[secure-64-char-secret]
NODE_ENV=production
CLIENT_URL=https://pritsitsolutions.com,https://www.pritsitsolutions.com
RAZORPAY_KEY_ID=rzp_live_SEMbnKzMyJ7QjQ
RAZORPAY_KEY_SECRET=[your-secret]
```

---

## Troubleshooting

### Deployment Failed?

1. **Check SSH connection:**
   ```powershell
   ssh root@72.62.246.58 'echo "Connection OK"'
   ```

2. **Check if server has space:**
   ```powershell
   ssh root@72.62.246.58 'df -h'
   ```

3. **View server logs:**
   ```powershell
   ssh root@72.62.246.58 'tail -n 50 /var/log/prits-backend.log'
   ```

### Website Not Loading?

1. **Check if backend is running:**
   ```powershell
   ssh root@72.62.246.58 'pm2 status'
   ```

2. **Restart manually if needed:**
   ```powershell
   ssh root@72.62.246.58 'cd /var/www/pritsitsolutions/backend && pm2 restart prits-backend'
   ```

3. **Check Nginx configuration:**
   ```powershell
   ssh root@72.62.246.58 'nginx -t && systemctl status nginx'
   ```

---

## Quick Commands Reference

| Action | Command |
|--------|---------|
| Deploy to server | `.\deploy-to-server.ps1` |
| Check server status | `ssh root@72.62.246.58 'pm2 status'` |
| View logs | `ssh root@72.62.246.58 'tail -f /var/log/prits-backend.log'` |
| Restart app | `ssh root@72.62.246.58 'pm2 restart prits-backend'` |
| Test locally | `npm run dev` (in both backend and pritsreact folders) |

---

## Need Help?

- Check existing deployment docs: `DEPLOYMENT_CHECKLIST.md`
- Review server setup: `deploy/DEPLOYMENT_INSTRUCTIONS.md`
- Nginx configuration: `deploy/nginx.conf`

---

**Ready to go live? Run `.\deploy-to-server.ps1` now! 🚀**
