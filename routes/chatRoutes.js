import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getMessages,
  sendMessage,
  getVendorConversations,
  getVendorMessages,
  sendVendorMessage,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protect, getMessages);
router.post("/", protect, sendMessage);

router.get("/vendor-conversations", protect, getVendorConversations);
router.get("/vendor-messages", protect, getVendorMessages);
router.post("/vendor-message", protect, sendVendorMessage);

export default router;
