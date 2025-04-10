import express, { Router } from "express";

import { registerUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/test", (req, res) => {
  console.log("Hit test route!");
  res.send("Test route working");
});

export default router;
