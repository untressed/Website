#!/bin/bash

# Deployment Script for UNTRESSED WebApp
# Run this on your Ubuntu VPS

# Exit on error
set -e

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📦 Pulling latest changes from Git..."
git pull

# 2. Backend Deployment
echo "🔧 Setting up Backend..."
cd backend
npm install
# Start or Restart PM2
if pm2 list | grep -q "untressed-backend"; then
    echo "🔄 Restarting Backend..."
    pm2 restart untressed-backend
else
    echo "▶️ Starting Backend..."
    pm2 start ecosystem.config.js
fi
cd ..

# 3. Frontend Deployment
echo "🎨 Setting up Frontend..."
cd frontend
npm install
echo "🏗️ Building Frontend..."
npm run build
cd ..

# 4. Nginx Reload
echo "web server configuration..."
# Copy Nginx config to system directory
sudo cp deploy/nginx.conf /etc/nginx/sites-available/default
# Reload Nginx to apply changes
sudo systemctl reload nginx

echo "✅ Deployment Complete!"
