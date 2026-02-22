import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    menu: [
      {
        name: { type: String, default: "" },
        time: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Menu", menuSchema);
