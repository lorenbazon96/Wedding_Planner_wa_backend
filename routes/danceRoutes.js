import express from "express";
import protect from "../middleware/authMiddleware.js";
import { saveDance, getDance } from "../controllers/danceController.js";

const router = express.Router();

router.post("/", protect, saveDance);
router.get("/", protect, getDance);

export default router;
