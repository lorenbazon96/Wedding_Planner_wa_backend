import express from "express";
import {
  getChats,
  createChat,
  deleteChat,
} from "../controllers/chatListController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getChats);
router.post("/", protect, createChat);
router.delete("/:id", protect, deleteChat);

export default router;
