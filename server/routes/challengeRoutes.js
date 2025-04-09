import express, { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  completeChallenge,
  createChallenge,
  getChallenges,
} from "../controllers/challengeController.js";

const router = Router();

router.post("/", createChallenge);
router.get("/", getChallenges);
router.post("/complete/:challengeId", protect, completeChallenge);

export default router;
