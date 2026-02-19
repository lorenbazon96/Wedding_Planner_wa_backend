import Vendor from "../models/Vendor.js";

export const getVendors = async (req, res) => {
  try {
    const filter = req.query.category ? { category: { $in: [req.query.category] } } : {};
    const vendors = await Vendor.find(filter);
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vendor) return res.status(404).json({ message: "Not found" });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
