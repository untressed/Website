const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../.env');
try {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/MONGO_URI=(.+)/);
    if (match) {
        const uri = match[1].trim();
        // Extract host
        // mongodb+srv://user:pass@HOST/db...
        const parts = uri.split('@');
        if (parts.length > 1) {
            const hostPart = parts[1].split('/')[0].split('?')[0];
            console.log("HOSTNAME_FOUND:", hostPart);
        } else {
            console.log("URI_FORMAT_UNKNOWN");
        }
    } else {
        console.log("NO_URI_FOUND");
    }
} catch (e) { console.error(e); }
