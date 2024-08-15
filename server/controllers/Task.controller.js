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
      status: status,
    });

    res.json({ message: "task created successfully" });
  } catch (error) {
    next(error);
  }
};

const editTask = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    await TaskSchema.updateOne(
      { _id: id },
      {
        status: status,
      }
    );

    res.json({ message: "task updated  successfully" });
  } catch (error) {
    next(error);
  }
};
const removeTask = async (req, res, next) => {
  try {
    const { id } = req.query;

    await TaskSchema.deleteOne({ _id: id });

    res.json({ message: "task updated  successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask, editTask, removeTask };
