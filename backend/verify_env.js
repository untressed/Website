require('dotenv').config();
const mongoose = require('mongoose');

console.log("Reading .env file...");

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("❌ ERROR: MONGO_URI is missing from .env");
    process.exit(1);
}

// Mask password for safe logging
const masked = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`Testing Connection to: ${masked}`);

// Extract hostname for DNS check
try {
    const host = uri.split('@')[1].split('/')[0];
    console.log(`Target Hostname: ${host}`);
} catch (e) {
    console.log("Could not parse hostname from URI");
}

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB successfully!');
        console.log('   The .env connection string is VALID.');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ FAILURE: Could not connect.');
        console.error(`   Error: ${err.message}`);
        process.exit(1);
    });
