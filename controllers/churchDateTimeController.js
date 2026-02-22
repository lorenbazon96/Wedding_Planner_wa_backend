import ChurchDateTime from "../models/ChurchDateTime.js";

export const saveChurchDateTime = async (req, res) => {
  try {
    const { date, time } = req.body;

    const record = await ChurchDateTime.findOneAndUpdate(
      { user: req.user.id },
      { date, time },
      { new: true, upsert: true },
    );

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChurchDateTime = async (req, res) => {
  try {
    const record = await ChurchDateTime.findOne({
      user: req.user.id,
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
