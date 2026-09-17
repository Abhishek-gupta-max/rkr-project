const router = require('express').Router();
const multer = require('multer');
const path   = require('path');
const db     = require('../db');
const { sendApplicationEmails } = require('../utils/email');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../../uploads/resumes');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const fieldPrefix = file.fieldname ? file.fieldname.replace(/[^a-z0-9]/gi, '_') : 'file';
    const name = `${fieldPrefix}_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  }
});

const ALLOWED_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.originalname}. Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!`));
    }
  }
});

// Configure multi-file upload support
const uploadFields = upload.fields([
  { name: 'cv_document', maxCount: 1 },
  { name: 'passport_document', maxCount: 1 },
  { name: 'experience_certificate', maxCount: 1 },
  { name: 'other_documents', maxCount: 1 },
  { name: 'resume', maxCount: 1 } // Legacy support
]);

// Auto-create table job_applications on startup/request
async function ensureJobApplicationsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(150) NOT NULL,
        father_name VARCHAR(150),
        date_of_birth DATE,
        gender VARCHAR(20),
        mobile_number VARCHAR(50) NOT NULL,
        whatsapp_number VARCHAR(50),
        email VARCHAR(150),
        current_city VARCHAR(100),
        current_country VARCHAR(100),
        trade_category VARCHAR(150) NOT NULL,
        total_experience VARCHAR(50),
        relevant_experience VARCHAR(50),
        current_job_title VARCHAR(150),
        previous_company VARCHAR(150),
        preferred_country VARCHAR(100),
        expected_salary VARCHAR(100),
        primary_skill VARCHAR(150),
        additional_skills TEXT,
        certifications TEXT,
        passport_number VARCHAR(50),
        passport_expiry DATE,
        passport_document VARCHAR(255),
        cv_document VARCHAR(255),
        experience_certificate VARCHAR(255),
        other_documents VARCHAR(255),
        message TEXT,
        admin_notes TEXT,
        status VARCHAR(50) DEFAULT 'NEW',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Ensure legacy applications table exists as well for backwards compatibility
    await db.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        job_position VARCHAR(150) NOT NULL,
        experience VARCHAR(50) NOT NULL,
        resume_file VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  } catch (e) {
    console.warn('[apply] table auto-create warning:', e.message);
  }
}

// Generate unique Application ID: APP-YYYY-XXXXXX
async function generateApplicationId() {
  const currentYear = new Date().getFullYear();
  const prefix = `APP-${currentYear}-`;

  const [rows] = await db.query(
    "SELECT application_id FROM job_applications WHERE application_id LIKE ? ORDER BY id DESC LIMIT 1",
    [`${prefix}%`]
  );

  let nextNum = 1;
  if (rows.length > 0 && rows[0].application_id) {
    const parts = rows[0].application_id.split('-');
    if (parts.length === 3) {
      const parsed = parseInt(parts[2], 10);
      if (!isNaN(parsed)) {
        nextNum = parsed + 1;
      }
    }
  }

  const paddedNum = String(nextNum).padStart(6, '0');
  return `${prefix}${paddedNum}`;
}

/**
 * POST /api/applications or /api/apply or /api/apply.php
 * Handles Job Application submission with file uploads.
 */
const appRoutes = ['/api/applications', '/api/apply.php', '/api/apply'];

router.post(appRoutes, (req, res) => {
  uploadFields(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded! Each file must be less than 5MB.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      await ensureJobApplicationsTable();

      const body = req.body || {};
      const files = req.files || {};

      // Map field names (supporting both new detailed form and legacy fields)
      const full_name           = (body.full_name || body.name || '').trim();
      const father_name         = (body.father_name || '').trim();
      const date_of_birth       = body.date_of_birth ? body.date_of_birth : null;
      const gender              = (body.gender || '').trim();
      const mobile_number       = (body.mobile_number || body.phone || '').trim();
      const whatsapp_number     = (body.whatsapp_number || '').trim();
      const email               = (body.email || '').trim();
      const current_city        = (body.current_city || '').trim();
      const current_country     = (body.current_country || '').trim();
      const trade_category      = (body.trade_category || body.job_position || body.trade || '').trim();
      const total_experience    = (body.total_experience || body.experience || '').trim();
      const relevant_experience = (body.relevant_experience || '').trim();
      const current_job_title  = (body.current_job_title || '').trim();
      const previous_company    = (body.previous_company || '').trim();
      const preferred_country   = (body.preferred_country || '').trim();
      const expected_salary     = (body.expected_salary || '').trim();
      const primary_skill       = (body.primary_skill || '').trim();
      const additional_skills   = (body.additional_skills || '').trim();
      const certifications      = (body.certifications || '').trim();
      const passport_number     = (body.passport_number || '').trim();
      const passport_expiry     = body.passport_expiry ? body.passport_expiry : null;
      const message             = (body.message || '').trim();

      // Required validation
      if (!full_name) {
        return res.status(400).json({ error: 'Full Name is required!' });
      }
      if (!mobile_number) {
        return res.status(400).json({ error: 'Mobile Number is required!' });
      }
      if (!trade_category) {
        return res.status(400).json({ error: 'Selected Trade / Skill is required!' });
      }

      // Check uploaded files
      const cvFile = files.cv_document ? files.cv_document[0] : (files.resume ? files.resume[0] : null);
      if (!cvFile) {
        return res.status(400).json({ error: 'CV / Resume file upload is required!' });
      }

      const cvPath = 'uploads/resumes/' + cvFile.filename;
      const passportPath = files.passport_document ? 'uploads/resumes/' + files.passport_document[0].filename : null;
      const expCertPath = files.experience_certificate ? 'uploads/resumes/' + files.experience_certificate[0].filename : null;
      const otherDocPath = files.other_documents ? 'uploads/resumes/' + files.other_documents[0].filename : null;

      // Generate unique application ID
      const application_id = await generateApplicationId();

      // Insert into job_applications
      const sql = `
        INSERT INTO job_applications (
          application_id, full_name, father_name, date_of_birth, gender,
          mobile_number, whatsapp_number, email, current_city, current_country,
          trade_category, total_experience, relevant_experience, current_job_title,
          previous_company, preferred_country, expected_salary, primary_skill,
          additional_skills, certifications, passport_number, passport_expiry,
          passport_document, cv_document, experience_certificate, other_documents,
          message, status
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, 'NEW'
        )
      `;

      const params = [
        application_id, full_name, father_name, date_of_birth, gender,
        mobile_number, whatsapp_number, email, current_city, current_country,
        trade_category, total_experience, relevant_experience, current_job_title,
        previous_company, preferred_country, expected_salary, primary_skill,
        additional_skills, certifications, passport_number, passport_expiry,
        passport_documentPath(files), cvPath, expCertPath, otherDocPath,
        message
      ];

      function passport_documentPath(files) {
        return files.passport_document ? 'uploads/resumes/' + files.passport_document[0].filename : null;
      }

      const [result] = await db.query(sql, [
        application_id, full_name, father_name, date_of_birth, gender,
        mobile_number, whatsapp_number, email, current_city, current_country,
        trade_category, total_experience, relevant_experience, current_job_title,
        previous_company, preferred_country, expected_salary, primary_skill,
        additional_skills, certifications, passport_number, passport_expiry,
        passportPath, cvPath, expCertPath, otherDocPath,
        message
      ]);

      // Also mirror to legacy applications table for backwards compatibility
      try {
        await db.query(
          `INSERT INTO applications (name, email, phone, job_position, experience, resume_file, file_path, message, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
          [full_name, email || mobile_number, mobile_number, trade_category, total_experience || 'Not Specified', cvFile.filename, cvPath, message]
        );
      } catch (legacyErr) {
        // Silently ignore legacy table mirror error
      }

      // Prepare data for email notification
      const created_at = new Date();
      sendApplicationEmails({
        application_id,
        full_name,
        email,
        mobile_number,
        trade_category,
        total_experience,
        preferred_country,
        current_city,
        created_at
      }).catch(err => console.error('Email error:', err));

      return res.json({
        success: true,
        application_id,
        message: 'Application submitted successfully!',
        id: result.insertId
      });

    } catch (dbErr) {
      console.error('[apply] Database error:', dbErr);
      return res.status(500).json({ error: 'Database error: ' + dbErr.message });
    }
  });
});

module.exports = router;
