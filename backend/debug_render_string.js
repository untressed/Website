const mongoose = require('mongoose');

// This is the EXACT string we want the user to use on Render
const TEST_URI = "mongodb+srv://prits-website:GTSoFLocHsVLA2b6@cluster0.bbd5x.mongodb.net/prits-website?authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

console.log("--- Testing Proposed Render Connection String ---");
console.log("URI:", TEST_URI);

mongoose.connect(TEST_URI)
    .then(() => {
        console.log("✅ SUCCESS: Connection successful!");
        console.log("This confirms the string is CORRECT and will work on Render (if IP is whitelisted).");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ FAILED: Could not connect.");
        console.error("Error:", err.message);
        console.error("Reason:", err.reason);
        process.exit(1);
    });
