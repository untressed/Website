const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env vars from the parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');

const seedAdmin = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);

        // Check if admin exists
        const adminEmail = 'admin@untressed.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (adminExists) {
            console.log('✅ Admin user already exists.');
        } else {
            console.log('Creating admin user...');
            const user = await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: 'password123', // The model middleware will hash this
                role: 'admin',
                contact: '1234567890',
                address: 'Admin HQ',
                orgName: 'UNTRESSED'
            });
            console.log('✅ Admin user created successfully.');
            console.log('📧 Email: admin@untressed.com');
            console.log('🔑 Password: password123');
        }

        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
