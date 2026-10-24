// Script to update PORT in .env file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    // Read the .env file
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Check if PORT exists
    if (envContent.includes('PORT=')) {
        // Replace existing PORT value
        envContent = envContent.replace(/PORT=\d+/g, 'PORT=5500');
        console.log('✅ Updated existing PORT to 5500');
    } else {
        // Add PORT if it doesn't exist
        envContent += '\nPORT=5500\n';
        console.log('✅ Added PORT=5500 to .env');
    }

    // Write back to .env
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file updated successfully');
    console.log('\n📝 Please restart your backend server with: npm start');
} catch (error) {
    console.error('❌ Error updating .env file:', error.message);
}
