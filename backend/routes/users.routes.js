
import { Router } from 'express';
import { registerUser, getUser, loginUser, getAllUsers } from '../src/controllers/usersController.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';
import { createUserMiddleware } from '../middleware/user.middleware.js';
import { validateLoginInput } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/users', verifyToken, getUser);
router.get('/users/all', verifyToken, getAllUsers);
router.post('/register', createUserMiddleware, registerUser);
router.post('/login', validateLoginInput, loginUser);

export default router;