import pool from '../config/db.js';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, role FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new user
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields (username, email, password, role) are required' });
  }

  try {
    // NOTE: password should be hashed in real app. Here just simple insert for demo.
    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, password, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Handle unique violation for username/email if needed
    res.status(500).json({ error: err.message });
  }
};

// PUT update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const fields = [];
    const values = [];
    let idx = 1;

    if (username) {
      fields.push(`username = $${idx++}`);
      values.push(username);
    }
    if (email) {
      fields.push(`email = $${idx++}`);
      values.push(email);
    }
    if (password) {
      fields.push(`password = $${idx++}`);
      values.push(password);
    }
    if (role) {
      fields.push(`role = $${idx++}`);
      values.push(role);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(id); // for WHERE

    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, username, email, role`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
