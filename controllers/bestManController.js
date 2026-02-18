import BestMan from "../models/BestMan.js";

export const createBestMan = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    console.log("USER FROM TOKEN:", req.user);

    const { name, accepted, tasks } = req.body;

    const bestman = new BestMan({
      name,
      accepted,
      tasks,
      user: req.user.id, // 🔥 OVO JE KLJUČ
    });

    await bestman.save();
    res.status(201).json(bestman);
  } catch (error) {
    console.error("Error saving BestMan:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllBestMan = async (req, res) => {
  try {
    const bestmen = await BestMan.find({ user: req.user.id });
    res.status(200).json(bestmen);
  } catch (error) {
    console.error("Error fetching BestMan:", error.message);
    res.status(500).json({ message: error.message });
  }
};
