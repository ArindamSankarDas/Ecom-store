import { Router } from "express";
import { loginUser } from "../controllers/authController.js";

const router = Router();

router.route("/").post(loginUser);

export default router;
