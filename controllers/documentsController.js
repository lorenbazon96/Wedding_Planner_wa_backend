import Documents from "../models/Documents.js";

export const saveDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { brideDocs, groomDocs } = req.body;

    const data = await Documents.findOneAndUpdate(
      { user: userId },
      { brideDocs, groomDocs },
      { new: true, upsert: true },
    );

    res.json(data);
  } catch (err) {
    console.error("SAVE DOCUMENTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const data = await Documents.findOne({ user: req.user.id });
    res.json(data || null);
  } catch (err) {
    console.error("GET DOCUMENTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
