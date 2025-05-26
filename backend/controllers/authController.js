// controllers/authController.js
import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token, role } = await loginUser(req.body);
    res.status(200).json({ message: 'Login successful', token, role });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
