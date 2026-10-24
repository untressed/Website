const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let uri = process.env.MONGO_URI;
console.log("Original URI loaded from .env (HIDDEN for now)");

// Append authSource=admin
if (uri.includes('?')) {
    uri += "&authSource=admin";
} else {
    uri += "?authSource=admin";
}

const part1 = uri.substring(0, 50);
const part2 = uri.substring(50, 100);
const part3 = uri.substring(100);

console.log("--- URI PART 1 ---");
console.log(part1);
console.log("--- URI PART 2 ---");
console.log(part2);
console.log("--- URI PART 3 ---");
console.log(part3);

mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS! Connected with authSource=admin");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ FAILED with authSource=admin");
        console.error(err.message);
        process.exit(1);
    });
