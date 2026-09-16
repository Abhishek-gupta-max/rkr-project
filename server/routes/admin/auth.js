const router = require('express').Router();
const jwt    = require('jsonwebtoken');

const JWT_SECRET      = process.env.JWT_SECRET       || 'newaadarsh_secure_salt_987123';
const JWT_EXPIRES_IN  = process.env.JWT_EXPIRES_IN   || '24h';
const ADMIN_USERNAME  = process.env.ADMIN_USERNAME   || 'admin';
const ADMIN_PASSWORD  = process.env.ADMIN_PASSWORD   || 'admin@123987';

/**
 * POST /api/admin/login.php
 * Body: { username, password }
 * Returns: { success, token, username, message }
 * Mirrors admin/login.php + auth_check.php generateToken()
 */
router.post(['/api/admin/login.php', '/api/admin/login'], (req, res) => {
  const { username = '', password = '' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({
      success:  true,
      token,
      username,
      message:  'Logged in successfully!'
    });
  }

  return res.status(401).json({ error: 'Invalid username or password!' });
});

module.exports = router;
