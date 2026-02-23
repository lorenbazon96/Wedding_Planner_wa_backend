import MaidOfHonor from "../models/MaidOfHonor.js";

export const createMaidOfHonor = async (req, res) => {
  try {
    const { name, accepted, tasks } = req.body;

    const maidOfHonor = await MaidOfHonor.findOneAndUpdate(
      { user: req.user.id },
      { name, accepted, tasks },
      { new: true, upsert: true },
    );

    res.status(200).json(maidOfHonor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMaidOfHonor = async (req, res) => {
  try {
    const maid = await MaidOfHonor.findOne({ user: req.user.id });
    res.status(200).json(maid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
