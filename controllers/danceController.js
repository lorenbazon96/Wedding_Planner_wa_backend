import Dance from "../models/Dance.js";

export const saveDance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { song, schedule } = req.body;

    const data = await Dance.findOneAndUpdate(
      { user: userId },
      { song, schedule },
      { new: true, upsert: true },
    );

    res.json(data);
  } catch (err) {
    console.error("SAVE DANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getDance = async (req, res) => {
  try {
    const data = await Dance.findOne({ user: req.user.id });
    res.json(data || { song: "", schedule: [] });
  } catch (err) {
    console.error("GET DANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
