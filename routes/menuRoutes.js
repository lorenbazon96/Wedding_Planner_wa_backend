import express from "express";
import protect from "../middleware/authMiddleware.js";
import { saveMenu, getMenu } from "../controllers/menuController.js";

const router = express.Router();

router.post("/", protect, saveMenu);
router.get("/", protect, getMenu);

export default router;
