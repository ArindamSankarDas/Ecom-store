import { Router } from 'express';
import {
	getCurrentUserDetails,
	updateCurrentUserDetails,
	updateCurrentPasswordDetails,
	deleteCurrentUser,
} from '../controllers/profileController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router
	.route('/user')
	.get(verifyJWT, getCurrentUserDetails)
	.patch(verifyJWT, updateCurrentUserDetails)
	.delete(verifyJWT, deleteCurrentUser);

router.route('/password').patch(verifyJWT, updateCurrentPasswordDetails);

export default router;
