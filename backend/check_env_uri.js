require('dotenv').config();

const uri = process.env.MONGO_URI || '';
console.log('Current Env URI Hostname:');
try {
    const host = uri.split('@')[1].split('/')[0];
    console.log(host);
} catch (e) {
    console.log('Could not parse URI');
}
