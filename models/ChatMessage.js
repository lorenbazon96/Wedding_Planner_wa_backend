import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    from: { type: String, enum: ["me", "them"], required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ["text", "file"], default: "text" },
  },
  { timestamps: true },
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;
