import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    address: String,
    phone: String,
    email: String,
    workingHours: {
      mon: String,
      tue: String,
      wed: String,
      thu: String,
      fri: String,
      sat: String,
      sun: String,
    },
    website: String,
    instagram: String,
    gallery: [String],
  },
  { timestamps: true },
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
