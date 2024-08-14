const ProjectSchema = require("../models/Project.model");
const TaskSchema = require("../models/Task.model");

const allProjects = async (req, res, next) => {
  try {
    const { userId, position } = req.query;

    const pipeline = [
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "projectIdRef",
          as: "tasks",
        },
      },
      {
        $unwind: {
          path: "$tasks",
          preserveNullAndEmptyArrays: true, // Preserve projects with no tasks
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "projectLead", // Assuming `projectLeadId` is the field in `tasks` referring to users
          foreignField: "_id",
          as: "projectLead",
        },
      },

      {
        $unwind: {
          path: "$projectLead",
          preserveNullAndEmptyArrays: true, // Preserve tasks with no matching users
        },
      },
      {
        $group: {
          _id: "$_id",
          projectName: { $first: "$projectName" }, // Use $first to get the projectName as it's a constant value within a group
          projectLead: { $first: "$projectLead" }, // Use $first to get the projectLead, assumes one lead per project
          tasks: { $push: "$tasks" },
        },
      },
    ];

    const Projects = await ProjectSchema.aggregate(pipeline);

    switch (position) {
      case "Manager":
        res.json({
          message: "all projects retrieved successfully",
          docs: Projects,
        });
        break;
      case "Project Lead":
        res.json({
          message: "all projects retrieved successfully",
          docs: Projects.filter(
            (project) => project.projectLead._id.toString() === userId
          ),
        });
        break;

      default:
        res.json({
          message: "all projects retrieved successfully",
          docs: Projects.filter((project) =>
            project.tasks.some(
              (task) => task.assignedDeveloper.toString() === userId
            )
          ),
        });
        break;
    }
  } catch (error) {
    next(error);
  }
};

const newProject = async (req, res, next) => {
  try {
    const { projectName, projectLead } = req.body;

    const project = await ProjectSchema.create({
      projectName: projectName,
      projectLead: projectLead,
    });

    res.json({ message: "project created successfully", docs: project });
  } catch (error) {
    res.json({ message: "project creation failed duped name", status: 400 });
    next(error);
  }
};

const projectDetails = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const pipeline = [
      { match: { _id: _id } },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "projectIdRef",
          as: "tasks",
        },
      },
      {
        $unwind: "$tasks",
      },
    ];

    const project = await ProjectSchema.aggregate(pipeline);

    res.json({ message: "user retrieved successfully ", docs: project });
  } catch (error) {
    next(error);
  }
};

const modifyProject = async (req, res, next) => {
  try {
    const { _id, projectName, projectLead } = req.body;

    await ProjectSchema.findByIdAndUpdate(
      {
        _id: _id,
      },
      { projectName: projectName, projectLead: projectLead }
    );

    res.json({ message: "project updated successfully " });
  } catch (error) {
    res.json({ message: "project updated failed duped names", status: 400 });
    next(error);
  }
};

const removeProject = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const tasks = await TaskSchema.find({ projectIdRef: _id });

    if (tasks.length === 0) {
      for (let i = 0; i < tasks.length; i++) {
        await TaskSchema.findByIdAndDelete({ _id: TaskSchema[i]._id });
      }
    }

    await UserSchema.findByIdAndDelete({
      _id: _id,
    });

    res.json({ message: "user removed successfully " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allProjects,
  newProject,
  projectDetails,
  modifyProject,
  removeProject,
};
