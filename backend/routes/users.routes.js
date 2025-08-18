
import { Router } from 'express';
import { registerUser, getUser, loginUser } from '../src/controllers/usersController.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';
import { createUserMiddleware } from '../middleware/user.middleware.js';

const router = Router();

router.get('/users', verifyToken, getUser);
router.post('/register', createUserMiddleware, registerUser);

router.post('/login', loginUser);

export default router;