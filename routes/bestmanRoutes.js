import express from "express";
import {
  createBestMan,
  getAllBestMan,
} from "../controllers/bestManController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBestMan);
router.get("/", protect, getAllBestMan);

export default router;
