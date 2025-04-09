import express, { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import { getDashboard, getUserProfile } from "../controllers/userController.js";

const router = Router();

router.get("/profile", protect, getUserProfile);
router.get("/dashboard", protect, getDashboard);

export default router;
