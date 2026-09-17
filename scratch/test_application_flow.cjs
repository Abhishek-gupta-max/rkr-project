const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testSubmitApplication() {
  try {
    console.log('🧪 Testing Job Application POST API...');

    const sampleFilePath = path.join(__dirname, 'test_cv.pdf');
    fs.writeFileSync(sampleFilePath, '%PDF-1.4 Dummy PDF Content for Testing');

    const form = new FormData();
    form.append('full_name', 'John Doe Test');
    form.append('father_name', 'Robert Doe');
    form.append('date_of_birth', '1995-08-15');
    form.append('gender', 'Male');
    form.append('mobile_number', '+91 9876543210');
    form.append('whatsapp_number', '+91 9876543210');
    form.append('email', 'johndoe.test@example.com');
    form.append('current_city', 'Mumbai');
    form.append('current_country', 'India');
    form.append('trade_category', 'Civil Engineers');
    form.append('total_experience', '5 Years');
    form.append('relevant_experience', '3 Years Gulf');
    form.append('current_job_title', 'Site Engineer');
    form.append('previous_company', 'L&T Construction');
    form.append('preferred_country', 'UAE / Dubai');
    form.append('expected_salary', '3500 AED');
    form.append('primary_skill', 'Civil Structural Supervision');
    form.append('additional_skills', 'AutoCAD, Primavera');
    form.append('certifications', 'B.Tech Civil Engineering');
    form.append('passport_number', 'Z9876543');
    form.append('passport_expiry', '2030-05-20');
    form.append('message', 'Testing end to end job application flow.');

    form.append('cv_document', fs.createReadStream(sampleFilePath));

    const response = await axios.post('http://localhost:8000/api/applications', form, {
      headers: form.getHeaders()
    });

    console.log('✅ Response:', response.data);
    if (response.data.success && response.data.application_id) {
      console.log('🎉 TEST PASSED! Generated Application ID:', response.data.application_id);
    } else {
      console.error('❌ TEST FAILED: Unexpected response format', response.data);
    }
  } catch (err) {
    if (err.response) {
      console.error('❌ API Error Response:', err.response.status, err.response.data);
    } else {
      console.error('❌ Error:', err.message);
    }
  }
}

testSubmitApplication();
