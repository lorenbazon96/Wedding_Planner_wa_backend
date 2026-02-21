import mongoose from "mongoose";

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  side: { type: String, enum: ["bride", "groom"], default: "bride" },
  group: {
    type: String,
    enum: ["family", "friends", "colleagues", "other"],
    default: "family",
  },
  status: {
    type: String,
    enum: ["invited", "confirmed", "declined", "maybe"],
    default: "invited",
  },
  seats: { type: Number, default: 1 },
  note: { type: String, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Guest", GuestSchema);
