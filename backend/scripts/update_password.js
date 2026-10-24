const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../.env');

const newHost = "prits-website.h9vetyy.mongodb.net";
const newUser = "deepankardayalprits_db_user";
const password = "6MkYzWnqS4pG2L44";
const dbName = "prits-website";
const params = "appName=Prits-website";

try {
    let content = fs.readFileSync(envPath, 'utf8');

    // Construct the full URI
    const newUri = `mongodb+srv://${newUser}:${password}@${newHost}/${dbName}?${params}`;

    // Replace the MONGO_URI line
    if (content.match(/MONGO_URI=.*/)) {
        content = content.replace(/MONGO_URI=.*/, `MONGO_URI=${newUri}`);
    } else {
        content += `\nMONGO_URI=${newUri}`;
    }

    fs.writeFileSync(envPath, content);
    console.log("✅ Updated .env with new Password.");

} catch (e) {
    console.error("❌ Error updating .env:", e);
    process.exit(1);
}
