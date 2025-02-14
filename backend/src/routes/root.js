import { Router } from "express";
import {
  getProducts,
  getProductItem,
  getCategoryList,
} from "../controllers/rootController.js";
import queryParser from "../middlewares/queryParser.js";

const router = Router();

router
  .get("/", getProducts, queryParser)
  .get("/category-list", getCategoryList)
  .get("/:productId", getProductItem, queryParser);

export default router;
