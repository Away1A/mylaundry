import express from 'express';
import customersRoutes from './customers.js';
import usersRoutes from './users.js';
import ordersRoutes from './orders.js';
import authRoutes from './auth.js';
import { authenticateToken } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Endpoint auth biasanya tidak perlu auth token (karena untuk login/register)
router.use('/auth', authRoutes);

// Middleware autentikasi diterapkan ke routes berikut agar semua route butuh token
router.use(authenticateToken);

router.use('/customers', customersRoutes);
router.use('/users', usersRoutes);
router.use('/orders', ordersRoutes);


export default router;
