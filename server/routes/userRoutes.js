import express, { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getDashboard,
  getUserBadges,
  getUserProfile,
} from "../controllers/userController.js";

const router = Router();

router.get("/profile", protect, getUserProfile);
router.get("/dashboard", protect, getDashboard);
router.get("/badges", protect, getUserBadges);

export default router;
