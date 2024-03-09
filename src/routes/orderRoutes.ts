// src/routes/groceryRoutes.ts

import express from 'express';
import { createOrder } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleWare';

const router = express.Router();

// Route for adding a new grocery item
router.post('/', authMiddleware, createOrder);

export default router;
