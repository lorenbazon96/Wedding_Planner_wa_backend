import mongoose from "mongoose";

const confettiNoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    noteText: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("ConfettiNote", confettiNoteSchema);
