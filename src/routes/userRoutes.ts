import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/login', UserController.login);
router.post('/sign-up', UserController.signup);

export default router;
