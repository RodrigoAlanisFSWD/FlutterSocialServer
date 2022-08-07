import { Router } from 'express';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import authController from '../controllers/authController';
import userController from '../controllers/userController';

const router = Router();

router.get("/profile", passport.authenticate('jwt', { session: false }), userController.getProfile);
router.post('/avatar', fileUpload(), passport.authenticate('jwt', { session: false }), userController.uploadAvatar);

export default router;