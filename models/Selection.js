import mongoose from "mongoose";

const selectionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    isPick: { type: String, enum: ["", "yes", "maybe"], default: "" },
    appointmentDate: Date,
    customField: String,
    notes: String,
    price: Number,
  },
  { timestamps: true },
);

selectionSchema.index({ user: 1, vendor: 1 }, { unique: true });

const Selection = mongoose.model("Selection", selectionSchema);

export default Selection;
