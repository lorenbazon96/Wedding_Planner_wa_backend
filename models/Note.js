import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, default: "New note" },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    done: { type: Boolean, default: false },
    text: { type: String, default: "" },
    image: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Note", NoteSchema);
