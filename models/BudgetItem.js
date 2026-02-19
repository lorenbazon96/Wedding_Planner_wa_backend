import mongoose from "mongoose";

const budgetItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, required: true },
    planned: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    document: { type: String, default: "" },
  },
  { timestamps: true },
);

budgetItemSchema.index({ user: 1, label: 1 }, { unique: true });

const BudgetItem = mongoose.model("BudgetItem", budgetItemSchema);

export default BudgetItem;
