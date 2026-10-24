const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const newApiUrl = 'http://localhost:5500';

try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Update or Add VITE_API_URL
    if (envContent.includes('VITE_API_URL=')) {
        envContent = envContent.replace(/VITE_API_URL=.*/, `VITE_API_URL=${newApiUrl}`);
        console.log('✅ Updated existing VITE_API_URL to ' + newApiUrl);
    } else {
        envContent += `\nVITE_API_URL=${newApiUrl}\n`;
        console.log('✅ Added VITE_API_URL=' + newApiUrl);
    }

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file updated successfully');
} catch (error) {
    console.error('❌ Error updating .env file:', error.message);
}
