import Lapel from "../models/Lapel.js";

export const saveLapel = async (req, res) => {
  try {
    const { women, men, children, assistants, notes, image } = req.body;

    let lapel = await Lapel.findOne({ user: req.user.id });

    if (lapel) {
      lapel.women = women;
      lapel.men = men;
      lapel.children = children;
      lapel.assistants = assistants;
      lapel.notes = notes;
      lapel.image = image;
    } else {
      lapel = new Lapel({
        women,
        men,
        children,
        assistants,
        notes,
        image,
        user: req.user.id,
      });
    }

    await lapel.save();
    res.status(200).json(lapel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Saving lapel failed" });
  }
};

export const getLapel = async (req, res) => {
  try {
    const lapel = await Lapel.findOne({ user: req.user.id });
    res.json(lapel);
  } catch (error) {
    res.status(500).json({ message: "Fetching lapel failed" });
  }
};
