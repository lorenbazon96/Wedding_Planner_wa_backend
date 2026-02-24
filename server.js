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
import maidOfHonorRoutes from "./routes/maidofhonorRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import chatListRoutes from "./routes/chatListRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import lapelRoutes from "./routes/lapelRoutes.js";
import churchDateTimeRoutes from "./routes/churchDateTimeRoutes.js";
import engagementCourseRoutes from "./routes/engagementCourseRoutes.js";
import priestMeetingRoutes from "./routes/priestMeetingRoutes.js";
import readersRoutes from "./routes/readersRoutes.js";
import documentsRoutes from "./routes/documentsRoutes.js";
import confettiRoutes from "./routes/confettiRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import danceRoutes from "./routes/danceRoutes.js";
import theDayRoutes from "./routes/theDayRoutes.js";

dotenv.config();

connectDB();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://weddingplanner-me4jbk89g-lorens-projects-ae807b2d.vercel.app"
  ],
  credentials: true
}));

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
app.use("/api/budget", budgetRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/chats", chatListRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/lapels", lapelRoutes);
app.use("/api/church-datetime", churchDateTimeRoutes);
app.use("/api/engagement-course", engagementCourseRoutes);
app.use("/api/priest-meeting", priestMeetingRoutes);
app.use("/api/readers", readersRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/confetti", confettiRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/dance", danceRoutes);
app.use("/api/the-day", theDayRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
