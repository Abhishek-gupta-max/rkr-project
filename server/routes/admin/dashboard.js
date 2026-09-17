const router = require('express').Router();
const db     = require('../../db');
const { requireAdminAuth } = require('../../middleware/auth');

async function getActiveAppTable() {
  try {
    const [tables] = await db.query("SHOW TABLES LIKE 'job_applications'");
    if (tables.length > 0) return 'job_applications';
  } catch (e) {
    // fallback
  }
  return 'applications';
}

/**
 * GET /api/admin/dashboard.php or /api/admin/dashboard
 * Returns detailed application metrics, trade category breakdown, and latest applications.
 */
router.get(['/api/admin/dashboard.php', '/api/admin/dashboard'], requireAdminAuth, async (req, res) => {
  try {
    const table = await getActiveAppTable();

    const [[{ total_apps }]]        = await db.query(`SELECT COUNT(*) AS total_apps FROM ${table}`);
    const [[{ new_apps }]]          = await db.query(`SELECT COUNT(*) AS new_apps FROM ${table} WHERE status='NEW' OR status='pending'`);
    const [[{ under_review_apps }]] = await db.query(`SELECT COUNT(*) AS under_review_apps FROM ${table} WHERE status='UNDER_REVIEW'`);
    const [[{ shortlisted_apps }]]  = await db.query(`SELECT COUNT(*) AS shortlisted_apps FROM ${table} WHERE status='SHORTLISTED'`);
    const [[{ selected_apps }]]     = await db.query(`SELECT COUNT(*) AS selected_apps FROM ${table} WHERE status='SELECTED' OR status='approved'`);
    const [[{ rejected_apps }]]     = await db.query(`SELECT COUNT(*) AS rejected_apps FROM ${table} WHERE status='REJECTED'`);
    const [[{ on_hold_apps }]]      = await db.query(`SELECT COUNT(*) AS on_hold_apps FROM ${table} WHERE status='ON_HOLD'`);

    // Category / Trade wise breakdown
    const tradeCol = table === 'job_applications' ? 'trade_category' : 'job_position';
    const [breakdownRows] = await db.query(
      `SELECT ${tradeCol} AS trade, COUNT(*) AS count FROM ${table} GROUP BY ${tradeCol} ORDER BY count DESC`
    );

    // Latest applications
    const nameCol = table === 'job_applications' ? 'full_name' : 'name';
    const phoneCol = table === 'job_applications' ? 'mobile_number' : 'phone';
    
    const [latestRows] = await db.query(
      `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 6`
    );

    return res.json({
      stats: {
        total_apps:        parseInt(total_apps) || 0,
        new_apps:          parseInt(new_apps) || 0,
        pending_apps:      parseInt(new_apps) || 0, // compatibility
        under_review_apps: parseInt(under_review_apps) || 0,
        shortlisted_apps:  parseInt(shortlisted_apps) || 0,
        selected_apps:     parseInt(selected_apps) || 0,
        approved_apps:     parseInt(selected_apps) || 0, // compatibility
        rejected_apps:     parseInt(rejected_apps) || 0,
        on_hold_apps:      parseInt(on_hold_apps) || 0
      },
      trade_breakdown: breakdownRows.map(r => ({
        trade: r.trade || 'Other / General',
        count: parseInt(r.count) || 0
      })),
      latest_applications: latestRows.map(r => ({
        id:             parseInt(r.id),
        application_id: r.application_id || `APP-${new Date(r.created_at || Date.now()).getFullYear()}-${String(r.id).padStart(6, '0')}`,
        name:           r.full_name || r.name,
        full_name:      r.full_name || r.name,
        email:          r.email,
        phone:          r.mobile_number || r.phone,
        mobile_number:  r.mobile_number || r.phone,
        trade_category: r.trade_category || r.job_position,
        job_position:   r.trade_category || r.job_position,
        preferred_country: r.preferred_country || '',
        experience:     r.total_experience || r.experience,
        status:         r.status || 'NEW',
        created_at:     r.created_at
      }))
    });
  } catch (err) {
    console.error('[dashboard] Error:', err.message);
    return res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

module.exports = router;
