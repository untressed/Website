const fetch = require('node-fetch');

async function testBackendConnection() {
    console.log('🔍 Testing Backend Server Connection...\n');

    const baseURL = 'http://localhost:5500';

    // Test 1: Check if server is running
    console.log('Test 1: Server Health Check');
    try {
        const response = await fetch(`${baseURL}/api/auth/login`, {
            method: 'GET'
        });
        console.log('   Status:', response.status);
        console.log('   ✅ Server is responding');
    } catch (error) {
        console.log('   ❌ Server is not responding:', error.message);
        return;
    }

    // Test 2: Test login endpoint with valid data
    console.log('\nTest 2: Login Endpoint (POST)');
    try {
        const response = await fetch(`${baseURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'testpassword'
            })
        });

        const data = await response.json();
        console.log('   Status:', response.status);
        console.log('   Response:', JSON.stringify(data, null, 2));

        if (response.status === 200) {
            console.log('   ✅ Login successful - Database is working!');
        } else if (response.status === 401 || response.status === 400) {
            console.log('   ✅ Endpoint is working (credentials invalid as expected)');
        }
    } catch (error) {
        console.log('   ❌ Login test failed:', error.message);
    }

    // Test 3: Test database connection via orders endpoint
    console.log('\nTest 3: Database Query Test');
    try {
        const response = await fetch(`${baseURL}/api/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('   Status:', response.status);

        if (response.status === 401) {
            console.log('   ✅ Endpoint requires authentication (working as expected)');
        } else {
            const data = await response.json();
            console.log('   Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.log('   ❌ Orders test failed:', error.message);
    }

    console.log('\n✅ Backend connection test complete!');
}

testBackendConnection().catch(console.error);
