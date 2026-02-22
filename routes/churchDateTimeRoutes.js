import express from "express";
import {
  saveChurchDateTime,
  getChurchDateTime,
} from "../controllers/churchDateTimeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveChurchDateTime);
router.get("/", protect, getChurchDateTime);

export default router;
