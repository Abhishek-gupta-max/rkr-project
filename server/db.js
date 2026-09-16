require('dotenv').config();
const mysql = require('mysql2/promise');

// Create connection pool (replaces PHP's new mysqli() per-request connection)
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASS     || '',
  database: process.env.DB_NAME     || 'rkr_project',
  port:     parseInt(process.env.DB_PORT || '3306'),
  charset:  'utf8mb4',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL connected → database:', process.env.DB_NAME);
    conn.release();
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    Check .env DB_HOST / DB_USER / DB_PASS / DB_NAME');
  });

module.exports = pool;
