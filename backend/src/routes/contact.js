import { Router } from 'express';
import { createNewMessageFromUser } from '../controllers/contactController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.route('/').post(verifyJWT, createNewMessageFromUser);

export default router;
