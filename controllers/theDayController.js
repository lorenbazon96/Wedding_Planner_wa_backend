import TheDay from "../models/TheDay.js";

export const saveTheDay = async (req, res) => {
  try {
    const userId = req.user.id;
    const { locations } = req.body;

    const data = await TheDay.findOneAndUpdate(
      { user: userId },
      { locations },
      { new: true, upsert: true },
    );

    res.json(data);
  } catch (err) {
    console.error("SAVE THE DAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getTheDay = async (req, res) => {
  try {
    const data = await TheDay.findOne({ user: req.user.id });
    res.json(data || { locations: [] });
  } catch (err) {
    console.error("GET THE DAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
