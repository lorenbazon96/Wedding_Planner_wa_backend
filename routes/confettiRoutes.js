import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  saveConfetti,
  getConfetti,
} from "../controllers/confettiController.js";

const router = express.Router();

router.post("/", protect, saveConfetti);
router.get("/", protect, getConfetti);

export default router;
