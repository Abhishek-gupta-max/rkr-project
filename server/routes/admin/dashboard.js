const router = require('express').Router();
const db     = require('../../db');
const { requireAdminAuth } = require('../../middleware/auth');

/**
 * GET /api/admin/dashboard.php
 * Returns stats + latest 5 applications.
 * Mirrors admin/dashboard.php
 */
router.get(['/api/admin/dashboard.php', '/api/admin/dashboard'], requireAdminAuth, async (req, res) => {
  try {
    const [[{ total_apps }]]   = await db.query('SELECT COUNT(*) AS total_apps FROM applications');
    const [[{ pending_apps }]] = await db.query("SELECT COUNT(*) AS pending_apps FROM applications WHERE status='pending'");
    const [[{ approved_apps }]]= await db.query("SELECT COUNT(*) AS approved_apps FROM applications WHERE status='approved'");
    const [[{ rejected_apps }]]= await db.query("SELECT COUNT(*) AS rejected_apps FROM applications WHERE status='rejected'");

    const [latestRows] = await db.query(
      'SELECT id, name, email, phone, job_position, status, created_at FROM applications ORDER BY created_at DESC LIMIT 5'
    );

    return res.json({
      stats: {
        total_apps:    parseInt(total_apps),
        pending_apps:  parseInt(pending_apps),
        approved_apps: parseInt(approved_apps),
        rejected_apps: parseInt(rejected_apps)
      },
      latest_applications: latestRows.map(r => ({
        id:           parseInt(r.id),
        name:         r.name,
        email:        r.email,
        phone:        r.phone,
        job_position: r.job_position,
        status:       r.status,
        created_at:   r.created_at
      }))
    });
  } catch (err) {
    console.error('[dashboard] Error:', err.message);
    return res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

module.exports = router;
