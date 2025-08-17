import { Router } from "express";
import { registerUser, getUser, loginUser } from "../src/controllers/usersController.js";

const router = Router();

router.get('/user', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;