const router = require('express').Router();
const path   = require('path');
const fs     = require('fs');
const db     = require('../../db');
const { requireAdminAuth } = require('../../middleware/auth');

const VALID_STATUSES = ['pending', 'approved', 'rejected'];

/**
 * GET /api/admin/applications.php
 *   ?id=N   → single application detail
 *   ?search=X → search by name/email/phone/position
 *   (none)  → all applications DESC
 *
 * POST /api/admin/applications.php
 *   { action: 'update_status', id, status }
 *
 * DELETE /api/admin/applications.php?id=N
 *   → deletes DB row + uploaded file
 *
 * Mirrors admin/applications.php
 */
const appPaths = ['/api/admin/applications.php', '/api/admin/applications'];
router.route(appPaths)
  // ── GET ────────────────────────────────────────────────────────────────────
  .get(requireAdminAuth, async (req, res) => {
    try {
      const id     = parseInt(req.query.id)     || 0;
      const search = (req.query.search || '').trim();

      if (id > 0) {
        const [rows] = await db.query('SELECT * FROM applications WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Application not found' });
        return res.json(rows[0]);
      }

      let sql    = 'SELECT * FROM applications';
      let params = [];

      if (search) {
        sql += ' WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR job_position LIKE ?';
        const like = `%${search}%`;
        params = [like, like, like, like];
      }

      sql += ' ORDER BY created_at DESC';

      const [rows] = await db.query(sql, params);
      return res.json(rows);
    } catch (err) {
      console.error('[applications GET] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── POST (update_status) ────────────────────────────────────────────────────
  .post(requireAdminAuth, async (req, res) => {
    try {
      const { action, id, status } = req.body;

      if (action !== 'update_status') {
        return res.status(400).json({ error: 'Invalid action!' });
      }

      const appId = parseInt(id) || 0;

      if (appId <= 0 || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Invalid ID or status value!' });
      }

      await db.query('UPDATE applications SET status = ? WHERE id = ?', [status, appId]);
      return res.json({ success: true, message: 'Status updated successfully!' });
    } catch (err) {
      console.error('[applications POST] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── DELETE ─────────────────────────────────────────────────────────────────
  .delete(requireAdminAuth, async (req, res) => {
    try {
      const appId = parseInt(req.query.id) || 0;

      if (appId <= 0) {
        return res.status(400).json({ error: 'Invalid ID provided!' });
      }

      // Get file path before deleting row
      const [rows] = await db.query('SELECT file_path FROM applications WHERE id = ?', [appId]);
      if (rows.length > 0 && rows[0].file_path) {
        const fullPath = path.join(__dirname, '../../../', rows[0].file_path);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      await db.query('DELETE FROM applications WHERE id = ?', [appId]);
      return res.json({ success: true, message: 'Application deleted successfully!' });
    } catch (err) {
      console.error('[applications DELETE] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  });

module.exports = router;
