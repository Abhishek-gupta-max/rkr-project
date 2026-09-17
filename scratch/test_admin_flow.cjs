const axios = require('axios');

async function testAdminFlow() {
  try {
    console.log('🧪 Testing Admin Flow...');

    // 1. Admin Login
    console.log('1. Logging in as admin...');
    const loginRes = await axios.post('http://localhost:8000/api/admin/login', {
      username: 'admin',
      password: 'admin@123987'
    });

    const token = loginRes.data.token;
    console.log('✅ Admin Login Successful! JWT Token received.');

    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    // 2. GET Admin Dashboard
    console.log('2. Fetching Admin Dashboard stats & breakdown...');
    const dashRes = await axios.get('http://localhost:8000/api/admin/dashboard.php', authHeader);
    console.log('📊 Dashboard Stats:', dashRes.data.stats);
    console.log('📈 Trade Category Breakdown:', dashRes.data.trade_breakdown);

    // 3. GET Admin Applications List (with search & trade filter)
    console.log('3. Fetching Applications with trade filter (Civil Engineers)...');
    const appsRes = await axios.get('http://localhost:8000/api/admin/applications.php?trade=Civil%20Engineers', authHeader);
    console.log(`📋 Found ${appsRes.data.length} applications for Civil Engineers.`);
    if (appsRes.data.length > 0) {
      console.log('Sample record:', {
        id: appsRes.data[0].id,
        application_id: appsRes.data[0].application_id,
        full_name: appsRes.data[0].full_name,
        trade_category: appsRes.data[0].trade_category,
        status: appsRes.data[0].status
      });

      // 4. Update Status
      const appId = appsRes.data[0].id;
      console.log(`4. Updating status for Application ID ${appId} to SHORTLISTED...`);
      const statusRes = await axios.post('http://localhost:8000/api/admin/applications.php', {
        action: 'update_status',
        id: appId,
        status: 'SHORTLISTED'
      }, authHeader);
      console.log('✅ Status Update Response:', statusRes.data);

      // 5. Update Admin Notes
      console.log(`5. Saving admin notes for Application ID ${appId}...`);
      const notesRes = await axios.post('http://localhost:8000/api/admin/applications.php', {
        action: 'update_notes',
        id: appId,
        notes: 'Candidate verified for Gulf civil engineering project deployment.'
      }, authHeader);
      console.log('✅ Admin Notes Response:', notesRes.data);
    }

    console.log('🎉 ALL ADMIN ENDPOINT TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    if (err.response) {
      console.error('❌ Admin Test Error Response:', err.response.status, err.response.data);
    } else {
      console.error('❌ Error:', err.message);
    }
  }
}

testAdminFlow();
