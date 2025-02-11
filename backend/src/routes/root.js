import { Router } from "express";
import { getProducts } from "../controllers/rootController.js"

const router = Router();

router.get("/", getProducts);

export default router;

