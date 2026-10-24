# ========================================
# 🚀 ONE-CLICK DEPLOYMENT SCRIPT
# ========================================
# This script deploys your application to the server at 72.62.246.58
# Run this script: .\deploy-to-server.ps1

param(
    [string]$ServerIP = "72.62.246.58",
    [string]$ServerUser = "root",
    [string]$AppPath = "/var/www/pritsitsolutions"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 UNTRESSED - Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build Frontend
Write-Host "📦 Step 1/5: Building React frontend..." -ForegroundColor Yellow
Set-Location "frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend built successfully!" -ForegroundColor Green
Set-Location ".."

# Step 2: Create deployment package
Write-Host ""
Write-Host "📦 Step 2/5: Creating deployment package..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$deployDir = "deploy_package_$timestamp"
New-Item -ItemType Directory -Path $deployDir -Force | Out-Null

# Copy backend files
Copy-Item -Path "backend\*" -Destination "$deployDir\backend\" -Recurse -Force -Exclude "node_modules", "*.log", "*.txt"
# Copy frontend build
Copy-Item -Path "frontend\dist" -Destination "$deployDir\frontend\dist" -Recurse -Force
# Copy production env
Copy-Item -Path "backend\.env.production" -Destination "$deployDir\backend\.env" -Force

Write-Host "✅ Deployment package created!" -ForegroundColor Green

# Step 3: Upload to server
Write-Host ""
Write-Host "📤 Step 3/5: Uploading to server..." -ForegroundColor Yellow
Write-Host "   Server: $ServerUser@$ServerIP" -ForegroundColor Gray
Write-Host "   You will be prompted for SSH password..." -ForegroundColor Gray
Write-Host ""

# Create app directory on server
ssh "$ServerUser@$ServerIP" "mkdir -p $AppPath"

# Upload files
scp -r "$deployDir\*" "$ServerUser@$ServerIP`:$AppPath/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green

# Step 4: Install dependencies and restart
Write-Host ""
Write-Host "🔧 Step 4/5: Installing dependencies on server..." -ForegroundColor Yellow
ssh "$ServerUser@$ServerIP" "cd $AppPath/backend && npm install --production"

Write-Host ""
Write-Host "🔄 Step 5/5: Restarting application..." -ForegroundColor Yellow

# Stop existing process
ssh "$ServerUser@$ServerIP" "pkill -f 'node.*server.js' || true"

# Start new process with PM2 (or node)
$startCommand = @"
cd $AppPath/backend && 
if command -v pm2 &> /dev/null; then
    pm2 stop prits-backend || true
    pm2 start server.js --name prits-backend
    pm2 save
else
    nohup node server.js > /var/log/prits-backend.log 2>&1 &
fi
"@

ssh "$ServerUser@$ServerIP" $startCommand

Write-Host "✅ Application restarted!" -ForegroundColor Green

# Cleanup
Write-Host ""
Write-Host "🧹 Cleaning up deployment package..." -ForegroundColor Yellow
Remove-Item -Path $deployDir -Recurse -Force
Write-Host "✅ Cleanup complete!" -ForegroundColor Green

# Final message
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your application should now be live at:" -ForegroundColor Cyan
Write-Host "   https://pritsitsolutions.com" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Test the website in your browser" -ForegroundColor Gray
Write-Host "   2. Try logging in to verify backend connectivity" -ForegroundColor Gray
Write-Host "   3. Check server logs if needed: ssh $ServerUser@$ServerIP 'tail -f /var/log/prits-backend.log'" -ForegroundColor Gray
Write-Host ""
