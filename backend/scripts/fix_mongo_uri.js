const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');

try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Regex to find MONGO_URI
    // Matches: MONGO_URI=mongodb+srv://user:pass@cluster.net/  OR ...cluster.net
    // We want to inject /prits-website before the query params or at the end

    const uriRegex = /MONGO_URI=(.*)/;
    const match = envContent.match(uriRegex);

    if (match) {
        let currentUri = match[1].trim();
        console.log('Current URI found (masked):', currentUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

        if (currentUri.includes('prits-website')) {
            console.log('✅ URI already points to prits-website. No changes needed.');
        } else {
            let newUri;
            // Check if it has query params (starts with ?)
            if (currentUri.includes('?')) {
                // Insert prits-website before the ? and ensuring no existing db name is there if it was just /
                // This is a bit tricky with regex, so let's parse it more manually for safety

                // standard atlas: mongodb+srv://u:p@host/  ?opts
                // or mongodb+srv://u:p@host  ?opts

                const parts = currentUri.split('?');
                let baseUrl = parts[0];
                const queryParams = parts[1];

                // If baseUrl ends with /, remove it
                if (baseUrl.endsWith('/')) {
                    baseUrl = baseUrl.slice(0, -1);
                }

                // If baseUrl has a path (db name) other than empty, we might be overwriting "test"
                // Simple check: splitting by / should give 3 parts for protocol, empty, host
                // mongodb+srv://host/dbname -> protocol, empty, host/dbname

                // safest way: append /prits-website
                newUri = `${baseUrl}/prits-website?${queryParams}`;

                // However, we must be careful if there was ALREADY a db name like /test
                // Let's assume the user wants to force prits-website.
                // A robust way uses the URL object but it might fail on some connection strings protocols.

                // Let's try string manipulation which is safer for this specific task
                // If it ends in .net or .com or localhost:port

                // If the base url has a slash at the end of the host section
                const lastSlashIndex = baseUrl.lastIndexOf('/');
                const protocolIndex = baseUrl.indexOf('://');

                if (lastSlashIndex > protocolIndex + 2) {
                    // There is a slash after the protocol. It might mark the db name start.
                    // e.g. mongodb+srv://u:p@host/test
                    // We replace everything after that slash with prits-website
                    newUri = baseUrl.substring(0, lastSlashIndex + 1) + 'prits-website?' + queryParams;
                } else {
                    // No slash for path, e.g. mongodb+srv://u:p@host
                    newUri = baseUrl + '/prits-website?' + queryParams;
                }

            } else {
                // No query params
                if (currentUri.endsWith('/')) {
                    newUri = currentUri + 'prits-website';
                } else {
                    // Check if it already has a path
                    const lastSlashIndex = currentUri.lastIndexOf('/');
                    const protocolIndex = currentUri.indexOf('://');

                    if (lastSlashIndex > protocolIndex + 2) {
                        // has a db name potentially
                        newUri = currentUri.substring(0, lastSlashIndex + 1) + 'prits-website';
                    } else {
                        newUri = currentUri + '/prits-website';
                    }
                }
            }

            console.log('Settings new URI to (masked):', newUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

            const newEnvContent = envContent.replace(uriRegex, `MONGO_URI=${newUri}`);
            fs.writeFileSync(envPath, newEnvContent);
            console.log('✅ .env file updated successfully!');
        }
    } else {
        console.error('❌ MONGO_URI not found in .env');
    }

} catch (err) {
    console.error('❌ Error processing .env file:', err);
}
