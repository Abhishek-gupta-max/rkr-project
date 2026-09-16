const router = require('express').Router();
const db     = require('../../db');
const { requireAdminAuth } = require('../../middleware/auth');

// Ensure job_requirements table exists (mirrors PHP's CREATE TABLE IF NOT EXISTS)
async function ensureTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS job_requirements (
      id               INT AUTO_INCREMENT PRIMARY KEY,
      position_title   VARCHAR(150) NOT NULL,
      description      LONGTEXT,
      requirements     TEXT,
      experience_needed VARCHAR(100),
      salary_range     VARCHAR(100),
      location         VARCHAR(150),
      status           VARCHAR(50) DEFAULT 'active',
      created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

/**
 * GET  /api/admin/requirements.php        → list all positions
 * GET  /api/admin/requirements.php?id=N   → single position
 * POST /api/admin/requirements.php        → add position
 * PUT  /api/admin/requirements.php        → update position
 * DELETE /api/admin/requirements.php?id=N → delete position
 *
 * Mirrors admin/requirements.php
 */
const reqPaths = ['/api/admin/requirements.php', '/api/admin/requirements'];
router.route(reqPaths)

  // ── GET ─────────────────────────────────────────────────────────────────────
  .get(requireAdminAuth, async (req, res) => {
    try {
      await ensureTable();
      const id = parseInt(req.query.id) || 0;

      if (id > 0) {
        const [rows] = await db.query('SELECT * FROM job_requirements WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Position not found' });
        return res.json(rows[0]);
      }

      const [rows] = await db.query('SELECT * FROM job_requirements ORDER BY created_at DESC');
      return res.json(rows);
    } catch (err) {
      console.error('[requirements GET] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── POST (add) ───────────────────────────────────────────────────────────────
  .post(requireAdminAuth, async (req, res) => {
    try {
      await ensureTable();
      const { position_title = '', description = '', requirements = '',
              experience_needed = '', salary_range = '', location = '' } = req.body;

      if (!position_title) {
        return res.status(400).json({ error: 'Position title is required!' });
      }

      const [result] = await db.query(
        `INSERT INTO job_requirements
           (position_title, description, requirements, experience_needed, salary_range, location)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [position_title, description, requirements, experience_needed, salary_range, location]
      );

      return res.json({ success: true, id: result.insertId, message: 'Position added successfully!' });
    } catch (err) {
      console.error('[requirements POST] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── PUT (update) ─────────────────────────────────────────────────────────────
  .put(requireAdminAuth, async (req, res) => {
    try {
      await ensureTable();
      const { id, position_title = '', description = '', requirements = '',
              experience_needed = '', salary_range = '', location = '',
              status = 'active' } = req.body;

      const jobId = parseInt(id) || 0;

      if (jobId <= 0 || !position_title) {
        return res.status(400).json({ error: 'Valid ID and Position Title are required!' });
      }

      await db.query(
        `UPDATE job_requirements SET
           position_title   = ?,
           description      = ?,
           requirements     = ?,
           experience_needed = ?,
           salary_range     = ?,
           location         = ?,
           status           = ?
         WHERE id = ?`,
        [position_title, description, requirements, experience_needed, salary_range, location, status, jobId]
      );

      return res.json({ success: true, message: 'Position updated successfully!' });
    } catch (err) {
      console.error('[requirements PUT] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  })

  // ── DELETE ───────────────────────────────────────────────────────────────────
  .delete(requireAdminAuth, async (req, res) => {
    try {
      await ensureTable();
      const id = parseInt(req.query.id) || 0;

      if (id <= 0) {
        return res.status(400).json({ error: 'Invalid ID provided!' });
      }

      await db.query('DELETE FROM job_requirements WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Position deleted successfully!' });
    } catch (err) {
      console.error('[requirements DELETE] Error:', err.message);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
  });

module.exports = router;
