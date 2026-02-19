import BudgetItem from "../models/BudgetItem.js";

export const getBudgetItems = async (req, res) => {
  try {
    const items = await BudgetItem.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveBudgetItems = async (req, res) => {
  try {
    const { items } = req.body;
    const ops = items.map((item) => ({
      updateOne: {
        filter: { user: req.user.id, label: item.label },
        update: {
          $set: {
            planned: item.planned || 0,
            spent: item.spent || 0,
            document: item.document || "",
          },
        },
        upsert: true,
      },
    }));
    await BudgetItem.bulkWrite(ops);
    const updated = await BudgetItem.find({ user: req.user.id });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
