import { Router } from 'express';
import {
	loginUser,
	registerUser,
	logoutUser,
	refreshTokenUser,
	currentUser,
	updateCurrentUserDetails,
	updateCurrentPasswordDetails,
	deleteCurrentUser,
} from '../controllers/authController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.route('/register').post(registerUser, loginUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/refresh').post(refreshTokenUser);
router
	.route('/user')
	.get(verifyJWT, currentUser)
	.patch(verifyJWT, updateCurrentUserDetails)
	.delete(verifyJWT, deleteCurrentUser);

router.route('/password').patch(verifyJWT, updateCurrentPasswordDetails);

export default router;
