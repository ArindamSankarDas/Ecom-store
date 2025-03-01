import { Router } from "express";

import queryParser from "../middlewares/queryParser.js";
import { searchProduct } from "../controllers/searchController.js";

const router = Router();

router.route("/").get(searchProduct, queryParser);

export default router;
