import express from "express";
import protect from "../middleware/authMiddleware.js";
import { saveTheDay, getTheDay } from "../controllers/theDayController.js";

const router = express.Router();

router.post("/", protect, saveTheDay);
router.get("/", protect, getTheDay);

export default router;
