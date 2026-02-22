import EngagementCourse from "../models/EngagementCourse.js";

export const saveEngagementCourse = async (req, res) => {
  try {
    const { startDate, endDate, schedule } = req.body;

    const record = await EngagementCourse.findOneAndUpdate(
      { user: req.user.id },
      { startDate, endDate, schedule },
      { new: true, upsert: true },
    );

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEngagementCourse = async (req, res) => {
  try {
    const record = await EngagementCourse.findOne({
      user: req.user.id,
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
