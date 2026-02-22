import PriestMeeting from "../models/PriestMeeting.js";

export const savePriestMeeting = async (req, res) => {
  console.log("🔥 SAVE HIT", req.body, req.user?.id);

  try {
    const { priestName, date, time } = req.body;

    const meeting = await PriestMeeting.findOneAndUpdate(
      { user: req.user.id },
      { priestName, date, time },
      { new: true, upsert: true },
    );

    res.json(meeting);
  } catch (err) {
    console.error("❌ SAVE ERROR", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPriestMeeting = async (req, res) => {
  const meeting = await PriestMeeting.findOne({ user: req.user.id });
  res.json(meeting);
};
