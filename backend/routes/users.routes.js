import { Router } from "express";
import { registerUser, getUser } from "../controllers/usersController.js";

const router = Router();

router.get('/user', getUser);
router.post('/register', registerUser);

export default router;