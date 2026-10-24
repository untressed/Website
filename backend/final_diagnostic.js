const mongoose = require('mongoose');

// The credentials we believe are correct
const URI_STANDARD = "mongodb+srv://prits-website:GTSoFLocHsVLA2b6@cluster0.bbd5x.mongodb.net/prits-website?retryWrites=true&w=majority&appName=Cluster0";
const URI_AUTH_ADMIN = "mongodb+srv://prits-website:GTSoFLocHsVLA2b6@cluster0.bbd5x.mongodb.net/prits-website?authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

async function testConnection(name, uri) {
    console.log(`\nTesting: ${name}...`);
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`✅ SUCCESS: ${name} connected!`);
        console.log(`   Connected to database: ${mongoose.connection.name}`);
        await mongoose.connection.close();
        return true;
    } catch (err) {
        console.error(`❌ FAILED: ${name}`);
        console.error(`   Error: ${err.message}`);
        return false;
    }
}

async function runDiagnostics() {
    console.log("=== MongoDB Diagnostic Tool ===");

    console.log("1. Testing Standard Connection...");
    const stdSuccess = await testConnection("Standard URI", URI_STANDARD);

    console.log("2. Testing AuthSource=Admin Connection...");
    const adminSuccess = await testConnection("AuthSource=Admin URI", URI_AUTH_ADMIN);

    console.log("\n=== SUMMARY ===");
    if (stdSuccess) {
        console.log("Standard URI works locally. If Render fails, it is an IP WHITELIST issue.");
    } else if (adminSuccess) {
        console.log("AuthSource=Admin URI works locally. You MUST use the '?authSource=admin' version on Render.");
    } else {
        console.log("BOTH failed locally. The password 'GTSoFLocHsVLA2b6' or username 'prits-website' is WRONG in Atlas.");
    }
}

runDiagnostics();
