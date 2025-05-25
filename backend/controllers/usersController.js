import models from '../models/index.js';
import { JWT_SECRET } from '../config.js';
import bcrypt from 'bcrypt';
const { User } = models;

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['id', 'DESC']],
      attributes: { exclude: ['password'] }, // jangan kirim password
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // hash password dulu
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    // jangan kirim password
    const { password: pwd, ...userData } = newUser.toJSON();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update user
export const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (password) {
      // hash password jika diupdate
      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    const { password: pwd, ...userData } = user.toJSON();
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
