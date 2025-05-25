import pool from '../config/db.js';

// GET all customers
export const getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single customer by ID
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new customer
export const createCustomer = async (req, res) => {
  const { name, phone, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers (name, phone, address) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update customer
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customers SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *',
      [name, phone, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE customer
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
