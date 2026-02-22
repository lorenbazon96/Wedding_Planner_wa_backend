import Menu from "../models/Menu.js";

export const saveMenu = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menu } = req.body;

    const data = await Menu.findOneAndUpdate(
      { user: userId },
      { menu },
      { new: true, upsert: true },
    );

    res.json(data);
  } catch (err) {
    console.error("SAVE MENU ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const data = await Menu.findOne({ user: req.user.id });
    res.json(data || { menu: [] });
  } catch (err) {
    console.error("GET MENU ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
