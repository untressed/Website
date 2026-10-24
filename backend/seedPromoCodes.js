const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PromoCode = require('./models/PromoCode');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Promo codes to seed
const promoCodes = [
    {
        code: 'SAVE10',
        discountPercentage: 10,
        description: '10% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE15',
        discountPercentage: 15,
        description: '15% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE20',
        discountPercentage: 20,
        description: '20% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE25',
        discountPercentage: 25,
        description: '25% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE30',
        discountPercentage: 30,
        description: '30% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE35',
        discountPercentage: 35,
        description: '35% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE40',
        discountPercentage: 40,
        description: '40% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE45',
        discountPercentage: 45,
        description: '45% discount on all services',
        isActive: true
    },
    {
        code: 'SAVE50',
        discountPercentage: 50,
        description: '50% discount on all services',
        isActive: true
    }
];

const seedPromoCodes = async () => {
    try {
        // Clear existing promo codes
        await PromoCode.deleteMany({});
        console.log('🗑️  Cleared existing promo codes');

        // Insert new promo codes
        const created = await PromoCode.insertMany(promoCodes);
        console.log(`✅ ${created.length} promo codes seeded successfully!`);

        console.log('\n📋 Seeded Promo Codes:');
        created.forEach(code => {
            console.log(`   ${code.code} - ${code.discountPercentage}% discount`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding promo codes:', error);
        process.exit(1);
    }
};

seedPromoCodes();
