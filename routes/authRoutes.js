import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteAccount,
  getVendorProfile,
  updateVendorProfile,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteAccount);
router.get("/vendor-profile", protect, getVendorProfile);
router.put("/vendor-profile", protect, updateVendorProfile);

export default router;
