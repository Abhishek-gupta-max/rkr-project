const router = require('express').Router();
const db = require('../db');

/**
 * Ensure business_enquiries table exists in MySQL database
 */
async function ensureEnquiryTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS business_enquiries (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        full_name        VARCHAR(150) NOT NULL,
        company_name     VARCHAR(150) DEFAULT NULL,
        email            VARCHAR(150) NOT NULL,
        phone            VARCHAR(50) NOT NULL,
        requirement_type VARCHAR(150) NOT NULL,
        message          TEXT NOT NULL,
        status           VARCHAR(50) DEFAULT 'new',
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  } catch (err) {
    console.warn('[contact] Warning creating business_enquiries table:', err.message);
  }
}

/**
 * POST /api/contact.php and /api/contact
 * Saves Business Enquiry to MySQL database.
 */
router.post(['/api/contact.php', '/api/contact', '/api/enquiry'], async (req, res) => {
  try {
    await ensureEnquiryTable();

    const fullName        = String(req.body.full_name || req.body.name || '').trim();
    const companyName     = String(req.body.company_name || req.body.company || '').trim();
    const email           = String(req.body.email || '').trim();
    const phone           = String(req.body.phone || '').trim();
    const requirementType = String(req.body.requirement_type || req.body.requirement || req.body.subject || '').trim();
    const message         = String(req.body.message || '').trim();

    if (!fullName || !email || !phone || !requirementType || !message) {
      return res.status(400).json({ error: 'All required fields must be provided!' });
    }

    // Save enquiry to MySQL database (business_enquiries)
    let insertId;
    try {
      const [result] = await db.query(
        `INSERT INTO business_enquiries
           (full_name, company_name, email, phone, requirement_type, message, status)
         VALUES (?, ?, ?, ?, ?, ?, 'new')`,
        [fullName, companyName || null, email, phone, requirementType, message]
      );
      insertId = result.insertId;
      console.log(`[contact] Saved enquiry #${insertId} into MySQL database`);
    } catch (dbErr) {
      console.error('[contact] Database Save Error:', dbErr.message);
      return res.status(500).json({ error: 'Unable to submit your enquiry right now. Please try again.' });
    }

    // Also insert into legacy contact_messages if table exists
    try {
      const [tables] = await db.query("SHOW TABLES LIKE 'contact_messages'");
      if (tables.length > 0) {
        await db.query(
          'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
          [fullName, email, phone, requirementType, message]
        );
      }
    } catch (legacyErr) {
      // Graceful no-op
    }

    return res.json({
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. We will contact you shortly.',
      enquiry_id: insertId
    });

  } catch (err) {
    console.error('[contact] Unexpected Error:', err.message);
    return res.status(500).json({ error: 'Unable to submit your enquiry right now. Please try again.' });
  }
});

module.exports = router;
