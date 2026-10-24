let fetch;
if (globalThis.fetch) {
    fetch = globalThis.fetch;
} else {
    try {
        fetch = require('node-fetch');
    } catch (e) {
        console.error("❌ Error: Global 'fetch' is not available (Node < 18) and 'node-fetch' is not installed.");
        console.error("   Please use Node 18+ or install node-fetch: npm install node-fetch");
        process.exit(1);
    }
}

const BASE_URL = 'http://localhost:5000/api/auth';

// Test User (Unlikely to collide with real admins)
const TEST_USER = {
    name: 'API_TEST_BOT',
    email: `apitest_${Date.now()}@test.com`,
    password: 'Password123!',
    contact: '1234567890',
    address: 'Test Address'
};

async function testAPI() {
    console.log('🚀 Starting API Verification Check...');
    console.log(`Target: ${BASE_URL}`);

    // 1. Register
    console.log('\n--------------------------------');
    console.log('1️⃣  Testing Registration...');
    try {
        const regRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_USER)
        });

        const regData = await regRes.json();

        if (regRes.ok) {
            console.log('✅ Registration SUCCESS');
            console.log('   User ID:', regData._id);
        } else {
            console.log('❌ Registration FAILED');
            console.log('   Status:', regRes.status);
            console.log('   Response:', regData);
            // If user already exists, that's "okay" for testing login, but we used a dynamic email.
        }

    } catch (error) {
        console.error('❌ Network Error during Registration:', error.message);
        if (error.cause) console.error('   Cause:', error.cause);
    }

    // 2. Login
    console.log('\n--------------------------------');
    console.log('2️⃣  Testing Login...');
    try {
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: TEST_USER.email,
                password: TEST_USER.password
            })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
            console.log('✅ Login SUCCESS');
            console.log('   Token Received:', loginData.token ? 'YES (Length: ' + loginData.token.length + ')' : 'NO');
            console.log('   Role:', loginData.role);
        } else {
            console.log('❌ Login FAILED');
            console.log('   Status:', loginRes.status);
            console.log('   Response:', loginData);
        }

    } catch (error) {
        console.error('❌ Network Error during Login:', error.message);
    }
    console.log('\n--------------------------------');
}

// Check if Node version supports fetch
if (!globalThis.fetch) {
    console.error('❌ This Node version does not support global fetch.');
    console.error('   Please run with Node 18+ or install node-fetch.');
    process.exit(1);
}

testAPI();
