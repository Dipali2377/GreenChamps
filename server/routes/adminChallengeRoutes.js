import express, { Router } from "express";
import {
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from "../controllers/adminChallengeController.js";

import protect from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = Router();

router.post("/challenges", protect, adminMiddleware, createChallenge);

router.put("/challenges/:id", protect, adminMiddleware, updateChallenge);

router.delete("/challenges/:id", protect, adminMiddleware, deleteChallenge);

export default router;
