// Authentication Test Script
// Run this with: node test-auth.js

const API_URL = 'http://localhost:8000';

async function testAuth() {
  console.log('🧪 Testing Authentication System...\n');

  // Test 1: Health Check
  console.log('1️⃣ Testing API Health...');
  try {
    const response = await fetch(`${API_URL}/api`);
    const data = await response.json();
    console.log('✅ API Health:', data.message);
  } catch (error) {
    console.error('❌ API Health failed:', error.message);
    return;
  }

  // Test 2: Test /auth/me without authentication
  console.log('\n2️⃣ Testing /auth/me without authentication...');
  try {
    const response = await fetch(`${API_URL}/auth/me`);
    console.log('Status:', response.status);
    if (response.status === 401) {
      console.log('✅ Correctly returns 401 for unauthenticated request');
    } else {
      console.log('⚠️  Unexpected status for unauthenticated request');
    }
  } catch (error) {
    console.error('❌ /auth/me test failed:', error.message);
  }

  // Test 3: Test Signup
  console.log('\n3️⃣ Testing Signup...');
  const testUser = {
    fullName: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'testpassword123'
  };

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    console.log('Signup Status:', response.status);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Signup successful:', data.user.email);
      
      // Test 4: Test Login with the same user
      console.log('\n4️⃣ Testing Login...');
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });

      console.log('Login Status:', loginResponse.status);
      const loginData = await loginResponse.json();
      
      if (loginResponse.ok && loginData.success) {
        console.log('✅ Login successful:', loginData.user.email);
        console.log('✅ JWT Token received:', loginData.token ? 'Yes' : 'No');
      } else {
        console.log('❌ Login failed:', loginData.message);
      }
    } else {
      console.log('❌ Signup failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Signup/Login test failed:', error.message);
  }

  // Test 5: Test Invalid Login
  console.log('\n5️⃣ Testing Invalid Login...');
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      })
    });

    console.log('Invalid Login Status:', response.status);
    if (response.status === 401) {
      console.log('✅ Correctly rejects invalid credentials');
    } else {
      console.log('⚠️  Unexpected status for invalid login');
    }
  } catch (error) {
    console.error('❌ Invalid login test failed:', error.message);
  }

  console.log('\n🎉 Authentication tests completed!');
}

// Run the tests
testAuth().catch(console.error);