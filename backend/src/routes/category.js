import { Router } from "express";
import { getCategoryProducts } from "../controllers/categoryController.js";
import queryParser from "../middlewares/queryParser.js";

const router = Router();

router.get("/:productCategory", getCategoryProducts, queryParser);

export default router;
