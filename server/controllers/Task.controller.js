const TaskSchema = require("../models/Task.model");

const newTask = async (req, res, next) => {
  try {
    const {
      projectIdRef,
      assignedDeveloper,
      description,
      dueDate,
      startDate,
      status,
    } = req.body;

    await TaskSchema.create({
      projectIdRef: projectIdRef,
      assignedDeveloper: assignedDeveloper,
      description: description,
      dueDate: dueDate || new Date(),
      startDate: startDate || new Date(),
    });

    res.json({ message: "task created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask };
