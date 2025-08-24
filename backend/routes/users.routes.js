
import { Router } from 'express';
import { registerUser, getUser, loginUser, getAllUsers, updateUserRole, deleteUser } from '../src/controllers/usersController.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';
import { createUserMiddleware } from '../middleware/user.middleware.js';
import { validateLoginInput } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/users', verifyToken, getUser);
router.get('/users/all', verifyToken, getAllUsers);
router.put('/users/:id/role', verifyToken, updateUserRole);
router.delete('/users/:id', verifyToken, deleteUser);
router.post('/register', createUserMiddleware, registerUser);
router.post('/login', validateLoginInput, loginUser);

export default router;