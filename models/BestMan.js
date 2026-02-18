import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const BestManSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accepted: { type: Boolean, default: false },
  tasks: [TaskSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("BestMan", BestManSchema);
