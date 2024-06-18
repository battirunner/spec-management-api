const jwt = require('jsonwebtoken');
// const pool = require('../db');
const db = require('../config/db.config');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const [rows] = db.query('SELECT role FROM Users WHERE id = ?', [decoded.id]);

    if (rows.length === 0 || rows[0].role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = { id: decoded.id, role: rows[0].role };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyAdmin;