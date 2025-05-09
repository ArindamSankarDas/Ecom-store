import { Router } from 'express';
import {
	getProducts,
	getProductItem,
	getCategoryList,
} from '../controllers/rootController.js';
import queryParser from '../middlewares/queryParser.js';

const router = Router();

router.route('/').get(getProducts, queryParser);
router.route('/category-list').get(getCategoryList);
router.route('/:productId').get(getProductItem, queryParser);

export default router;
