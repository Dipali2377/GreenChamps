import express, { Router } from "express";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
