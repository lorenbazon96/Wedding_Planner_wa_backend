import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    subjectId: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Chat", ChatSchema);
