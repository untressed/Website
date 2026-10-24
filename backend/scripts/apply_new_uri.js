const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../.env');

const newHost = "prits-website.h9vetyy.mongodb.net";
const newUser = "deepankardayalprits_db_user";
const dbName = "prits-website";
const params = "appName=Prits-website";

try {
    let content = fs.readFileSync(envPath, 'utf8');

    // Attempt to extract password from existing URI
    // Format: mongodb+srv://user:PASSWORD@host...
    const match = content.match(/MONGO_URI=mongodb\+srv:\/\/([^:]+):([^@]+)@/);

    let password = "password"; // default fallback if extraction fails
    let passwordFound = false;

    if (match && match[2]) {
        const found = match[2];
        // Filter out obvious placeholders
        if (found !== '<password>' && found !== 'password' && found !== '<db_password>') {
            password = found;
            passwordFound = true;
            console.log("✅ Found potential password in existing .env, preserving it.");
        } else {
            console.log("⚠️  Existing password appears to be a placeholder.");
        }
    } else {
        console.log("⚠️  Could not parse password from existing .env.");
    }

    const newUri = `mongodb+srv://${newUser}:${password}@${newHost}/${dbName}?${params}`;

    // Replace the MONGO_URI line
    if (content.match(/MONGO_URI=.*/)) {
        content = content.replace(/MONGO_URI=.*/, `MONGO_URI=${newUri}`);
    } else {
        content += `\nMONGO_URI=${newUri}`;
    }

    fs.writeFileSync(envPath, content);
    console.log("✅ Updated .env with new URI structure.");
    console.log("Target Host:", newHost);
    console.log("Target User:", newUser);
    console.log("Target DB:", dbName);

} catch (e) {
    console.error("❌ Error updating .env:", e);
    process.exit(1);
}
