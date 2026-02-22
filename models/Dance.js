import mongoose from "mongoose";

const danceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    song: { type: String, default: "" },
    schedule: [
      {
        date: { type: String, default: "" },
        time: { type: String, default: "" },
        place: { type: String, default: "" },
        confirmed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Dance", danceSchema);
