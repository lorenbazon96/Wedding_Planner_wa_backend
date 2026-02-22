import express from "express";
import {
  savePriestMeeting,
  getPriestMeeting,
} from "../controllers/priestMeetingController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, savePriestMeeting);
router.get("/", protect, getPriestMeeting);

export default router;
