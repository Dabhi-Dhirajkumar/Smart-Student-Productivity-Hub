const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, name, email, role, theme FROM Users WHERE id = $1', [req.user.id]);
    if(rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching user' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, theme, password } = req.body;
    
    if (password) {
       const salt = await bcrypt.genSalt(10);
       const hashed = await bcrypt.hash(password, salt);
       await db.query('UPDATE Users SET name = $1, theme = $2, password_hash = $3 WHERE id = $4', [name, theme, hashed, req.user.id]);
    } else {
       await db.query('UPDATE Users SET name = $1, theme = $2 WHERE id = $3', [name, theme, req.user.id]);
    }
    
    // fetch updated
    const { rows } = await db.query('SELECT id, name, email, role, theme FROM Users WHERE id = $1', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error updating user' });
  }
};

// Admin only operations
exports.getAllUsers = async (req, res) => {
  try {
     const { rows } = await db.query('SELECT id, name, email, role, theme, created_at FROM Users ORDER BY id DESC');
     res.json(rows);
  } catch (error) {
     res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
     await db.query('DELETE FROM Users WHERE id = $1', [req.params.id]);
     res.json({ message: 'User deleted' });
  } catch (error) {
     res.status(500).json({ error: 'Failed to delete user' });
  }
};
