import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/authController';

const router = Router();

router.get("/profile", passport.authenticate('jwt', { session: false }), authController.getProfile);

export default router;