import mongoose from "mongoose";

const docItemSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
  },
  { _id: false },
);

const documentsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    brideDocs: [docItemSchema],
    groomDocs: [docItemSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Documents", documentsSchema);
