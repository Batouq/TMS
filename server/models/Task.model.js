const mongoose = require("mongoose");

const Task = new mongoose.Schema(
  {
    projectIdRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    assignedDeveloper: {
      type: mongoose.Schema.Types.ObjectId,
    },
    dueDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Not Assigned", "Not Started", "In Progress", "Completed"],
      required: true,
      default: "Not Assigned",
    },
  },
  {
    timestamps: true,
  }
);

const TaskSchema = mongoose.model("task", Task);
module.exports = TaskSchema;
