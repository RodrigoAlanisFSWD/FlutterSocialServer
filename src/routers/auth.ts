import { Router } from 'express'
import authController from '../controllers/authController';

const router = Router();

router.post("/sign-up", authController.signUp);

export default router;