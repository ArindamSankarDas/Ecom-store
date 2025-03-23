import { Router } from 'express';
import {
	deleteUserCartItem,
	getUserCart,
	setUserCart,
} from '../controllers/cartController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router
	.route('/')
	.get(verifyJWT, getUserCart)
	.post(verifyJWT, setUserCart)
	.delete(verifyJWT, deleteUserCartItem);

export default router;
