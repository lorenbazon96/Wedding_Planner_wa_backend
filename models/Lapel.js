import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema({
  name: String,
  checked: Boolean,
});

const lapelSchema = new mongoose.Schema(
  {
    women: {
      type: Number,
      default: 0,
    },
    men: {
      type: Number,
      default: 0,
    },
    children: {
      type: Number,
      default: 0,
    },
    assistants: [assistantSchema],
    notes: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Lapel", lapelSchema);
