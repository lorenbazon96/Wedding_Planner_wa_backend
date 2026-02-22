import mongoose from "mongoose";

const theDaySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    locations: [
      {
        name: { type: String, default: "" },
        time: { type: String, default: "" },
        address: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("TheDay", theDaySchema);
