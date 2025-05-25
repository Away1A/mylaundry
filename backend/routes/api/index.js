import express from 'express';
import customerRoutes from '../customers.js';
import userRoutes from '../users.js';

const router = express.Router();

// Route prefixing
router.use('/customers', customerRoutes);
router.use('/users', userRoutes);

export default router;
