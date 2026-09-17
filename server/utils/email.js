const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport from environment variables
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null; // SMTP credentials not configured
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send email notification to Admin and Confirmation to Applicant
 */
async function sendApplicationEmails(applicationData) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('ℹ️ SMTP credentials not fully configured in environment. Skipping email dispatch.');
      return false;
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    const fromAddress = process.env.SMTP_FROM || `RKR Globalpath Recruitment <${process.env.SMTP_USER}>`;

    const {
      application_id,
      full_name,
      email,
      mobile_number,
      trade_category,
      total_experience,
      preferred_country,
      current_city,
      created_at
    } = applicationData;

    // 1. Send Admin Notification Email
    if (adminEmail) {
      const adminMailOptions = {
        from: fromAddress,
        to: adminEmail,
        subject: `New Job Application Received: ${application_id} - ${full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px;">New Job Application Received</h2>
            <p>A new applicant has submitted their profile for <strong>${trade_category}</strong>.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Application ID:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #d97706; font-weight: bold;">${application_id}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Applicant Name:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${full_name}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Selected Trade:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>${trade_category}</strong></td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Mobile:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${mobile_number}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${email || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Total Experience:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${total_experience || 'N/A'}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Preferred Country:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${preferred_country || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Current Location:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${current_city || 'N/A'}</td></tr>
            </table>
            <p style="margin-top: 20px; font-size: 13px; color: #64748b;">Log into the Admin Panel to review complete details and uploaded documents.</p>
          </div>
        `
      };
      await transporter.sendMail(adminMailOptions);
      console.log(`✅ Admin notification email sent for ${application_id}`);
    }

    // 2. Send Applicant Confirmation Email (if email provided)
    if (email) {
      const applicantMailOptions = {
        from: fromAddress,
        to: email,
        subject: `Application Confirmation - ${application_id} | RKR Globalpath`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e3a8a;">Application Received Successfully</h2>
            <p>Dear <strong>${full_name}</strong>,</p>
            <p>Thank you for submitting your job application to <strong>RKR Globalpath Consultancy</strong>.</p>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 5px 0;"><strong>Application Reference Number:</strong></p>
              <p style="margin: 0; font-size: 20px; font-weight: bold; color: #0284c7;">${application_id}</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;"><strong>Trade Category:</strong> ${trade_category}</p>
            </div>
            <p>Our recruitment evaluation team will review your qualifications and profile. If your profile matches an active international deployment opportunity, our representative will contact you directly on your mobile number (<strong>${mobile_number}</strong>).</p>
            <br/>
            <p style="margin: 0;">Best regards,</p>
            <p style="margin: 5px 0 0 0; font-weight: bold; color: #1e3a8a;">Recruitment Team</p>
            <p style="margin: 0; color: #64748b; font-size: 13px;">RKR Globalpath Manpower Consultants</p>
          </div>
        `
      };
      await transporter.sendMail(applicantMailOptions);
      console.log(`✅ Applicant confirmation email sent to ${email}`);
    }

    return true;
  } catch (err) {
    console.error('⚠️ Warning: Failed to send application email notification:', err.message);
    return false;
  }
}

module.exports = {
  sendApplicationEmails
};
