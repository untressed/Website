---
description: Deploy application to live server
---

# Deploy to Live Server Workflow

This workflow deploys your UNTRESSED application to your production server.

## Prerequisites

- SSH access to server at 72.62.246.58
- Server password ready

---

## Quick Deploy (Recommended)

// turbo
### Run the automated deployment script:
```powershell
.\deploy-to-server.ps1
```

This single command will:
1. Build the React frontend
2. Package all files
3. Upload to server
4. Install dependencies
5. Restart the application

**You'll be prompted for your SSH password 2-3 times during the process.**

---

## Manual Deploy (Alternative)

If you prefer to deploy step-by-step:

// turbo
### 1. Build the frontend
```powershell
cd frontend
npm run build
cd ..
```

### 2. Upload backend files
```powershell
scp -r backend/* root@72.62.246.58:/var/www/pritsitsolutions/backend/
```

### 3. Upload frontend build
```powershell
scp -r frontend/dist root@72.62.246.58:/var/www/pritsitsolutions/frontend/
```

### 4. Upload production environment
```powershell
scp backend/.env.production root@72.62.246.58:/var/www/pritsitsolutions/backend/.env
```

### 5. SSH into server and restart
```powershell
ssh root@72.62.246.58
```

Then on the server:
```bash
cd /var/www/pritsitsolutions/backend
npm install --production
pm2 restart prits-backend
# OR if not using PM2:
# pkill -f 'node.*server.js'
# nohup node server.js > /var/log/prits-backend.log 2>&1 &
exit
```

---

## Verify Deployment

### Test the live site
```powershell
# Open in browser
start https://pritsitsolutions.com
```

### Check server logs
```powershell
ssh root@72.62.246.58 'tail -f /var/log/prits-backend.log'
```

---

## Troubleshooting

### If deployment fails:

1. **Check SSH connection:**
   ```powershell
   ssh root@72.62.246.58 'echo "Connection OK"'
   ```

2. **Check server disk space:**
   ```powershell
   ssh root@72.62.246.58 'df -h'
   ```

3. **Check if app is running:**
   ```powershell
   ssh root@72.62.246.58 'pm2 status'
   ```

4. **View error logs:**
   ```powershell
   ssh root@72.62.246.58 'tail -n 50 /var/log/prits-backend.log'
   ```
