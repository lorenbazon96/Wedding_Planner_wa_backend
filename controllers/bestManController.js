import BestMan from "../models/BestMan.js";

export const createBestMan = async (req, res) => {
  try {
    const { name, accepted, tasks } = req.body;

    const bestman = await BestMan.findOneAndUpdate(
      { user: req.user.id },
      { name, accepted, tasks },
      { new: true, upsert: true },
    );

    res.status(200).json(bestman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBestMan = async (req, res) => {
  try {
    const bestman = await BestMan.findOne({ user: req.user.id });
    res.status(200).json(bestman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
