import mongoose from "mongoose";

const engagementCourseSchema = new mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    schedule: [
      {
        date: String,
        time: String,
        place: String,
        confirmed: Boolean,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("EngagementCourse", engagementCourseSchema);
