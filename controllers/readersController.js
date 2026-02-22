import Readers from "../models/Readers.js";

export const saveReaders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { readers } = req.body;

    const data = await Readers.findOneAndUpdate(
      { user: userId },
      { readers },
      { new: true, upsert: true },
    );

    res.json(data);
  } catch (err) {
    console.error("SAVE READERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getReaders = async (req, res) => {
  try {
    const data = await Readers.findOne({ user: req.user.id });
    res.json(data || null);
  } catch (err) {
    console.error("GET READERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
