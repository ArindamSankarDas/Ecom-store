import { Router } from "express";
import { registerUser } from "../controllers/authController.js";

const router = Router();

router.
	post("/", registerUser);

export default router;
