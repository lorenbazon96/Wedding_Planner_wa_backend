import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getSelections, getSelectionByVendor, saveSelection } from "../controllers/selectionController.js";

const router = express.Router();

router.get("/", protect, getSelections);
router.get("/:vendorId", protect, getSelectionByVendor);
router.post("/", protect, saveSelection);

export default router;
