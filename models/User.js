import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    brideName: String,
    groomName: String,
    dateWedding: Date,
    coverImage: String,
    role: { type: String, enum: ["user", "vendor"], default: "user" },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
