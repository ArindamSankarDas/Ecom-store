import { Router } from 'express';
import {
	createNewPayment,
	paymentWebhook,
} from '../controllers/paymentController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.route('/create').post(verifyJWT, createNewPayment);
router.route('/webhook').post(paymentWebhook);

export default router;
