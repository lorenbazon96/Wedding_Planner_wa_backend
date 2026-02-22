import express from "express";
import protect from "../middleware/authMiddleware.js";
import { saveLapel, getLapel } from "../controllers/lapelController.js";

const router = express.Router();

router.get("/", protect, getLapel);
router.post("/", protect, saveLapel);

export default router;
