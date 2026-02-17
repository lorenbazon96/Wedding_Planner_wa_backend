import Selection from "../models/Selection.js";

export const getSelections = async (req, res) => {
  try {
    const selections = await Selection.find({ user: req.user.id });
    res.json(selections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSelectionByVendor = async (req, res) => {
  try {
    const selection = await Selection.findOne({
      user: req.user.id,
      vendor: req.params.vendorId,
    });
    res.json(selection || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveSelection = async (req, res) => {
  try {
    const { vendor, isPick, appointmentDate, customField, notes, price } =
      req.body;
    const selection = await Selection.findOneAndUpdate(
      { user: req.user.id, vendor },
      { isPick, appointmentDate, customField, notes, price },
      { new: true, upsert: true },
    );
    res.json(selection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
