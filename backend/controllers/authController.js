import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index.js'; // pastikan path ini benar sesuai struktur project-mu
import { JWT_SECRET } from '../config/config.js';
const { User } = models;


export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };