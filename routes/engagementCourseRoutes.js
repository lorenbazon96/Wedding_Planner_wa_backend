import express from "express";
import {
  saveEngagementCourse,
  getEngagementCourse,
} from "../controllers/engagementCourseController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveEngagementCourse);
router.get("/", protect, getEngagementCourse);

export default router;
