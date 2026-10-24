const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const testLogin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // List all users
        const users = await User.find({}).select('name email contact');
        console.log('\n📋 Users in database:');
        console.log(users);

        // Test password matching for first user
        if (users.length > 0) {
            const testUser = await User.findOne({ email: users[0].email });
            console.log('\n🔍 Testing password match for:', testUser.email);

            // Try a test password
            const testPassword = 'test123'; // You'll need to use actual password
            const isMatch = await testUser.matchPassword(testPassword);
            console.log('Password match result:', isMatch);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testLogin();
