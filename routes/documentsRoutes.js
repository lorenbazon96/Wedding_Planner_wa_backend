import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  saveDocuments,
  getDocuments,
} from "../controllers/documentsController.js";

const router = express.Router();

router.post("/", protect, saveDocuments);
router.get("/", protect, getDocuments);

export default router;
