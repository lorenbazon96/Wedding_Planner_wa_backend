import mongoose from "mongoose";

const readerSchema = new mongoose.Schema(
  {
    fullName: String,
    reading: String,
    done: Boolean,
  },
  { _id: false },
);

const readersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    readers: [readerSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Readers", readersSchema);
