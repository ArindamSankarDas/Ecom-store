import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
  res.json(req.body);
});

export default router;
