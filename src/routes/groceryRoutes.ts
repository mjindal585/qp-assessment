// src/routes/groceryRoutes.ts

import express from 'express';
import GroceryController from '../controllers/groceryController';
import { authMiddleware } from '../middlewares/authMiddleWare';
import isAdminMiddleware from '../middlewares/isAdminMiddleWare';

const router = express.Router();

// Route for adding a new grocery item
router.post('/', authMiddleware, isAdminMiddleware, GroceryController.addGroceryItem);

// Route for viewing all grocery items
router.get('/', GroceryController.viewGroceryItems);

// Route for removing a grocery item by ID
router.delete('/:id', authMiddleware, isAdminMiddleware, GroceryController.removeGroceryItem);

// Route for updating details of a grocery item by ID
router.put('/:id', authMiddleware, isAdminMiddleware, GroceryController.updateGroceryItem);

export default router;
