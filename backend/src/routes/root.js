import { Router } from "express";
import {
  getProducts,
  getProductItem,
  getCategoryList,
} from "../controllers/rootController.js";
import queryParser from "../middlewares/queryParser.js";
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.route("/").get(verifyJWT, getProducts, queryParser);
router.route("/:productId").get(getProductItem, queryParser);
router.route("/category-list").get(getCategoryList);

export default router;
