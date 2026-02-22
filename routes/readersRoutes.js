import express from "express";
import protect from "../middleware/authMiddleware.js";
import { saveReaders, getReaders } from "../controllers/readersController.js";

const router = express.Router();

router.post("/", protect, saveReaders);
router.get("/", protect, getReaders);

export default router;
