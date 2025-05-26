// services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import { JWT_SECRET } from '../config/config.js';
const { User } = models;


export const registerUser = async ({ username, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
    role: user.role,
  };
};
