const mongoose = require("mongoose");

const Project = new mongoose.Schema(
  {
    projectName: {
      type: String,
      require: true,
      unique: true,
    },
    projectLead: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectSchema = mongoose.model("project", Project);
module.exports = ProjectSchema;
