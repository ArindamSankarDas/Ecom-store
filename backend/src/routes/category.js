import { Router } from 'express';
import { getCategoryProducts } from '../controllers/categoryController.js';
import queryParser from '../middlewares/queryParser.js';

const router = Router();

router.route('/:productCategory').get(getCategoryProducts, queryParser);

export default router;
