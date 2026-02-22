import mongoose from "mongoose";

const priestMeetingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priestName: String,
    date: String,
    time: String,
  },
  { timestamps: true },
);

export default mongoose.model("PriestMeeting", priestMeetingSchema);
