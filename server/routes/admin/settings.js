const router = require('express').Router();
const db     = require('../../db');
const { requireAdminAuth } = require('../../middleware/auth');

/**
 * GET /api/admin/settings.php
 * Returns system info + DB statistics.
 * Mirrors admin/settings.php
 */
router.get(['/api/admin/settings.php', '/api/admin/settings'], requireAdminAuth, async (req, res) => {
  try {
    // Determine active jobs table
    const [tables] = await db.query("SHOW TABLES LIKE 'job_requirements'");
    const reqTable = tables.length > 0 ? 'job_requirements' : 'jobs';

    const [[{ total_applications }]] = await db.query('SELECT COUNT(*) AS total_applications FROM applications');
    const [[{ job_positions }]]      = await db.query(`SELECT COUNT(*) AS job_positions FROM ${reqTable}`);
    const [[{ pending }]]            = await db.query("SELECT COUNT(*) AS pending FROM applications WHERE status='pending'");
    const [[{ approved }]]           = await db.query("SELECT COUNT(*) AS approved FROM applications WHERE status='approved'");

    return res.json({
      system_info: {
        node_version:  process.version,
        mysql_server:  'MySQL/MariaDB (via mysql2)',
        server_time:   new Date().toLocaleString('en-IN', {
          timeZone:     'Asia/Kolkata',
          dateStyle:    'long',
          timeStyle:    'short'
        })
      },
      statistics: {
        total_applications: parseInt(total_applications),
        job_positions:      parseInt(job_positions),
        pending:            parseInt(pending),
        approved:           parseInt(approved)
      }
    });
  } catch (err) {
    console.error('[settings] Error:', err.message);
    return res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

module.exports = router;
