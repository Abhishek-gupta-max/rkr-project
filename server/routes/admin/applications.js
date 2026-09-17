const router = require('express').Router();
const path   = require('path');
const fs     = require('fs');
const db     = require('../../db');
const { requireAdminAuth } = require('../../middleware/auth');

const VALID_STATUSES = [
  'NEW', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED', 'ON_HOLD',
  'pending', 'approved' // legacy support
];

/**
 * Helper to determine which table to query
 */
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
 * Normalize application row for frontend consistency
 */
function normalizeAppRow(row) {
  if (!row) return null;
  return {
    id:                    parseInt(row.id) || 0,
    application_id:        row.application_id || `APP-${new Date(row.created_at || Date.now()).getFullYear()}-${String(row.id).padStart(6, '0')}`,
    full_name:             row.full_name || row.name || '',
    name:                  row.full_name || row.name || '', // compatibility alias
    father_name:           row.father_name || '',
    date_of_birth:         row.date_of_birth || null,
    gender:                row.gender || '',
    mobile_number:         row.mobile_number || row.phone || '',
    phone:                 row.mobile_number || row.phone || '', // compatibility alias
    whatsapp_number:       row.whatsapp_number || '',
    email:                 row.email || '',
    current_city:          row.current_city || '',
    current_country:       row.current_country || '',
    trade_category:        row.trade_category || row.job_position || '',
    job_position:          row.trade_category || row.job_position || '', // compatibility alias
    total_experience:      row.total_experience || row.experience || '',
    experience:            row.total_experience || row.experience || '', // compatibility alias
    relevant_experience:   row.relevant_experience || '',
    current_job_title:     row.current_job_title || '',
    previous_company:      row.previous_company || '',
    preferred_country:     row.preferred_country || '',
    expected_salary:       row.expected_salary || '',
    primary_skill:         row.primary_skill || '',
    additional_skills:     row.additional_skills || '',
    certifications:        row.certifications || '',
    passport_number:       row.passport_number || '',
    passport_expiry:       row.passport_expiry || null,
    passport_document:     row.passport_document || null,
    cv_document:           row.cv_document || row.file_path || null,
    file_path:             row.cv_document || row.file_path || null, // compatibility alias
    resume_file:           row.resume_file || (row.cv_document ? path.basename(row.cv_document) : null), // compatibility alias
    experience_certificate: row.experience_certificate || null,
    other_documents:       row.other_documents || null,
    message:               row.message || '',
    admin_notes:           row.admin_notes || '',
    status:                row.status || 'NEW',
    created_at:            row.created_at || '',
    updated_at:            row.updated_at || ''
  };
}

/**
 * GET /api/admin/applications.php or /api/admin/applications
 * Query Params:
 *   ?id=N
 *   ?search=X
 *   ?trade=X
 *   ?status=X
 *   ?sort=newest|oldest
 */
const appPaths = ['/api/admin/applications.php', '/api/admin/applications'];

router.route(appPaths)
  // ── GET ────────────────────────────────────────────────────────────────────
  .get(requireAdminAuth, async (req, res) => {
    try {
      const table  = await getActiveAppTable();
      const id     = parseInt(req.query.id) || 0;
      const search = (req.query.search || '').trim();
      const trade  = (req.query.trade || req.query.trade_category || '').trim();
      const status = (req.query.status || '').trim();
      const sort   = (req.query.sort || 'newest').toLowerCase();

      if (id > 0) {
        const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Application not found' });
        return res.json(normalizeAppRow(rows[0]));
      }

      let sql    = `SELECT * FROM ${table} WHERE 1=1`;
      let params = [];

      if (search) {
        if (table === 'job_applications') {
          sql += ' AND (full_name LIKE ? OR email LIKE ? OR mobile_number LIKE ? OR application_id LIKE ? OR trade_category LIKE ? OR current_city LIKE ?)';
          const like = `%${search}%`;
          params.push(like, like, like, like, like, like);
        } else {
          sql += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR job_position LIKE ?)';
          const like = `%${search}%`;
          params.push(like, like, like, like);
        }
      }

      if (trade && trade !== 'ALL') {
        if (table === 'job_applications') {
          sql += ' AND trade_category = ?';
        } else {
          sql += ' AND job_position = ?';
        }
        params.push(trade);
      }

      if (status && status !== 'ALL') {
        sql += ' AND status = ?';
        params.push(status);
      }

      if (sort === 'oldest') {
        sql += ' ORDER BY created_at ASC';
      } else {
        sql += ' ORDER BY created_at DESC';
      }

      const [rows] = await db.query(sql, params);
      return res.json(rows.map(normalizeAppRow));
    } catch (err) {
      console.error('[applications GET] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── POST (update_status / update_notes) ────────────────────────────────────
  .post(requireAdminAuth, async (req, res) => {
    try {
      const table = await getActiveAppTable();
      const { action, id, status, notes, admin_notes } = req.body;
      const appId = parseInt(id) || 0;

      if (appId <= 0) {
        return res.status(400).json({ error: 'Invalid application ID!' });
      }

      if (action === 'update_status') {
        if (!status || !VALID_STATUSES.includes(status)) {
          return res.status(400).json({ error: 'Invalid status value!' });
        }
        await db.query(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, appId]);
        return res.json({ success: true, message: 'Status updated successfully!', status });
      }

      if (action === 'update_notes') {
        const noteText = notes !== undefined ? notes : admin_notes;
        if (table === 'job_applications') {
          await db.query('UPDATE job_applications SET admin_notes = ? WHERE id = ?', [noteText, appId]);
        }
        return res.json({ success: true, message: 'Admin notes updated successfully!', admin_notes: noteText });
      }

      return res.status(400).json({ error: 'Invalid action provided!' });
    } catch (err) {
      console.error('[applications POST] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── DELETE ─────────────────────────────────────────────────────────────────
  .delete(requireAdminAuth, async (req, res) => {
    try {
      const table = await getActiveAppTable();
      const appId = parseInt(req.query.id) || 0;

      if (appId <= 0) {
        return res.status(400).json({ error: 'Invalid ID provided!' });
      }

      // Fetch file paths before deleting row
      const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [appId]);
      if (rows.length > 0) {
        const row = rows[0];
        const docPaths = [
          row.cv_document || row.file_path,
          row.passport_document,
          row.experience_certificate,
          row.other_documents
        ].filter(Boolean);

        docPaths.forEach(docPath => {
          const fullPath = path.join(__dirname, '../../../', docPath);
          if (fs.existsSync(fullPath)) {
            try { fs.unlinkSync(fullPath); } catch (e) { /* ignore */ }
          }
        });
      }

      await db.query(`DELETE FROM ${table} WHERE id = ?`, [appId]);
      return res.json({ success: true, message: 'Application deleted successfully!' });
    } catch (err) {
      console.error('[applications DELETE] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  });

// ── GET /api/admin/applications/:id ─────────────────────────────────────────
router.get(['/api/admin/applications/:id'], requireAdminAuth, async (req, res) => {
  try {
    const table = await getActiveAppTable();
    const id = parseInt(req.params.id) || 0;
    const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Application not found' });
    return res.json(normalizeAppRow(rows[0]));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ── PATCH /api/admin/applications/:id ───────────────────────────────────────
router.patch(['/api/admin/applications/:id'], requireAdminAuth, async (req, res) => {
  try {
    const table = await getActiveAppTable();
    const id = parseInt(req.params.id) || 0;
    const { status, admin_notes } = req.body;

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value!' });
      }
      await db.query(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, id]);
    }

    if (admin_notes !== undefined && table === 'job_applications') {
      await db.query(`UPDATE job_applications SET admin_notes = ? WHERE id = ?`, [admin_notes, id]);
    }

    const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    return res.json({ success: true, message: 'Updated successfully', data: normalizeAppRow(rows[0]) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
