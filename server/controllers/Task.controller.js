const TaskSchema = require("../models/Task.model");

const newTask = async (req, res, next) => {
  try {
    const { projectIdRef, assignedDeveloper, dueDate, startDate, status } =
      req.body;

    await TaskSchema.create({
      projectIdRef: projectIdRef,
      assignedDeveloper: assignedDeveloper,
      dueDate: dueDate || new Date(),
      startDate: startDate || new Date(),
      status: status,
    });

    res.json({ message: "task created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask };
