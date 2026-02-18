import MaidOfHonor from "../models/MaidOfHonor.js";

export const createMaidOfHonor = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    console.log("USER FROM TOKEN:", req.user);

    const { name, accepted, tasks } = req.body;

    const maidOfHonor = new MaidOfHonor({
      name,
      accepted,
      tasks,
      user: req.user.id, // 🔥 ovo mora biti id iz tokena
    });

    await maidOfHonor.save();
    res.status(201).json(maidOfHonor);
  } catch (error) {
    console.error("Error saving MaidOfHonor:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllMaidOfHonor = async (req, res) => {
  try {
    const maids = await MaidOfHonor.find({ user: req.user.id });
    res.status(200).json(maids);
  } catch (error) {
    console.error("Error fetching MaidOfHonor:", error.message);
    res.status(500).json({ message: error.message });
  }
};
