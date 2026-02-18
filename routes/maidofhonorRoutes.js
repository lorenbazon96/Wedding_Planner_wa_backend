import express from "express";
import {
  createMaidOfHonor,
  getAllMaidOfHonor,
} from "../controllers/maidOfHonorController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMaidOfHonor);
router.get("/", protect, getAllMaidOfHonor);

export default router;
