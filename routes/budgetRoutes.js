import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getBudgetItems, saveBudgetItems } from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", protect, getBudgetItems);
router.put("/", protect, saveBudgetItems);

export default router;
