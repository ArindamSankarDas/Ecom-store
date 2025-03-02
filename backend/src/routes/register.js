import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.
	route("/").post(registerUser, loginUser);

export default router;
