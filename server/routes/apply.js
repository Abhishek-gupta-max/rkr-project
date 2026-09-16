const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const db      = require('../db');

// ── Multer storage config (mirrors PHP upload logic in apply.php) ─────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/resumes'));
  },
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = 'resume_' + Date.now() + '_' + Math.random().toString(36).slice(2) + ext;
    cb(null, name);
  }
});

const ALLOWED_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB — same as PHP
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!'));
    }
  }
});

/**
 * POST /api/apply.php
 * multipart/form-data: { name, email, phone, job_position, experience, message, resume }
 * Mirrors apply.php
 */
router.post(['/api/apply.php', '/api/apply'], (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    // Handle multer errors (file type / size)
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size must be less than 5MB!' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required!' });
    }

    const { name = '', email = '', phone = '', job_position = '', experience = '', message = '' } = req.body;

    if (!name || !email || !phone || !job_position || !experience) {
      return res.status(400).json({
        error: 'All required fields (name, email, phone, position, experience) must be provided!'
      });
    }

    const resumeFile = req.file.filename;
    const filePath   = 'uploads/resumes/' + resumeFile;

    try {
      await db.query(
        `INSERT INTO applications (name, email, phone, job_position, experience, resume_file, file_path, message)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, job_position, experience, resumeFile, filePath, message]
      );
      return res.json({ success: true, message: 'Application submitted successfully!' });
    } catch (dbErr) {
      console.error('[apply] DB error:', dbErr.message);
      return res.status(500).json({ error: 'Database error: ' + dbErr.message });
    }
  });
});

module.exports = router;
