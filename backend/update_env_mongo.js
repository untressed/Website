const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const newMongoUri = 'mongodb+srv://deepankardayalprits_db_user:Svom0MFjUhJlvqJo@prits-website.h9vetyy.mongodb.net/?appName=Prits-website';

try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Update or Add MONGO_URI
    if (envContent.includes('MONGO_URI=')) {
        envContent = envContent.replace(/MONGO_URI=.*/, `MONGO_URI=${newMongoUri}`);
        console.log('✅ Updated existing MONGO_URI');
    } else {
        envContent += `\nMONGO_URI=${newMongoUri}\n`;
        console.log('✅ Added MONGO_URI');
    }

    // Ensure PORT is 5500 if it exists, or add it
    if (envContent.includes('PORT=')) {
        envContent = envContent.replace(/PORT=\d+/, 'PORT=5500');
        console.log('✅ Ensured PORT=5500');
    } else {
        envContent += '\nPORT=5500\n';
        console.log('✅ Added PORT=5500');
    }

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file updated successfully');
} catch (error) {
    console.error('❌ Error updating .env file:', error.message);
}
