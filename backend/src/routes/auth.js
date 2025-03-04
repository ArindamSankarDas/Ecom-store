import { Router } from 'express';
import {
	loginUser,
	registerUser,
	logoutUser,
} from '../controllers/authController.js';

const router = Router();

router.route('/register').post(registerUser, loginUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;
