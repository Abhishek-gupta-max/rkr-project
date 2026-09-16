const router = require('express').Router();
const db = require('../db');

/**
 * Map a DB row to the frontend-expected shape.
 * Mirrors PHP mapJobRow() in jobs.php.
 */
function mapJobRow(row) {
  const title = row.position_title || row.title || '';
  const slug = row.slug
    || title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return {
    id:           parseInt(row.id) || 0,
    title,
    description:  row.description  || '',
    requirements: row.requirements || '',
    experience:   row.experience_needed || row.experience || '',
    salary:       row.salary_range      || row.salary     || '',
    job_location: row.location          || row.job_location || '',
    company_name: row.company_name      || 'NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED',
    category:     row.category          || 'Manpower',
    vacancies:    row.vacancies         || 'Openings',
    status:       row.status            || 'active',
    created_at:   row.created_at        || '',
    slug
  };
}

async function ensureTables() {
  try {
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
    await db.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        name         VARCHAR(150) NOT NULL,
        email        VARCHAR(150) NOT NULL,
        phone        VARCHAR(50) NOT NULL,
        job_position VARCHAR(150) NOT NULL,
        experience   VARCHAR(50) NOT NULL,
        resume_file  VARCHAR(255) NOT NULL,
        file_path    VARCHAR(255) NOT NULL,
        message      TEXT,
        status       VARCHAR(50) DEFAULT 'pending',
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  } catch (e) {
    console.warn('[jobs] table auto-create warning:', e.message);
  }
}

/**
 * GET /api/jobs.php
 * Query params:
 *   ?id=N   → single job by ID
 *   ?slug=X → single job by slug
 *   (none)  → all active jobs
 */
router.get(['/api/jobs.php', '/api/jobs'], async (req, res) => {
  try {
    await ensureTables();
    const id   = parseInt(req.query.id)  || 0;
    const slug = req.query.slug || '';

    // Determine active table (job_requirements preferred, fallback to jobs)
    const [tables] = await db.query("SHOW TABLES LIKE 'job_requirements'");
    const table = tables.length > 0 ? 'job_requirements' : 'jobs';

    if (id > 0) {
      // Single job by ID
      const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      return res.json(mapJobRow(rows[0]));
    }

    if (slug) {
      // Single job by slug
      let rows;
      if (table === 'jobs') {
        [rows] = await db.query('SELECT * FROM jobs WHERE slug = ?', [slug]);
      } else {
        [rows] = await db.query('SELECT * FROM job_requirements');
      }
      const found = rows.map(mapJobRow).find(j => j.slug === slug);
      if (!found) {
        return res.status(404).json({ error: `Job not found by slug: ${slug}` });
      }
      return res.json(found);
    }

    // All active jobs
    const [rows] = await db.query(
      `SELECT * FROM ${table} WHERE status = 'active' ORDER BY id DESC`
    );
    let jobs = rows.map(mapJobRow);

    // Fallback to legacy jobs table if job_requirements is empty
    if (jobs.length === 0 && table === 'job_requirements') {
      const [legacyTables] = await db.query("SHOW TABLES LIKE 'jobs'");
      if (legacyTables.length > 0) {
        const [legacyRows] = await db.query(
          "SELECT * FROM jobs WHERE status = 'active' ORDER BY id DESC"
        );
        jobs = legacyRows.map(mapJobRow);
      }
    }

    return res.json(jobs);
  } catch (err) {
    console.error('[jobs] Error:', err.message);
    return res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

module.exports = router;
