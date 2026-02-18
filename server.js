import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import selectionRoutes from "./routes/selectionRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";
import bestmanRoutes from "./routes/bestmanRoutes.js";
import maidOfHonorRoutes from "./routes/maidOfHonorRoutes.js";

dotenv.config();

connectDB();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/selections", selectionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/bestman", bestmanRoutes);
app.use("/maidofhonor", maidOfHonorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
