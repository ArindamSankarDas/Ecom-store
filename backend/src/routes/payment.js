import { Router } from 'express';
import {
	createNewPayment,
	paymentStatus,
	paymentWebhook,
} from '../controllers/paymentController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.route('/create').post(verifyJWT, createNewPayment);
router.route('/payment-status/:orderId').get(verifyJWT, paymentStatus);
router.route('/webhook').post(paymentWebhook);

export default router;
