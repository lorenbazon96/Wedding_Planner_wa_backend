import ConfettiNote from "../models/ConfettiNote.js";

export const saveConfetti = async (req, res) => {
  try {
    const userId = req.user.id;
    const { noteText } = req.body;

    const data = await ConfettiNote.findOneAndUpdate(
      { user: userId },
      { noteText },
      { new: true, upsert: true },
    );

    res.json(data);
  } catch (err) {
    console.error("SAVE CONFETTI ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getConfetti = async (req, res) => {
  try {
    const data = await ConfettiNote.findOne({ user: req.user.id });
    res.json(data || { noteText: "" });
  } catch (err) {
    console.error("GET CONFETTI ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
