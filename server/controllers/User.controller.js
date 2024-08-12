const UserSchema = require("../models/User.model");
const ProjectSchema = require("../models/Project.model");
const projectSchema = require("../models/Project.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const allUsers = async (req, res, next) => {
  try {
    const users = await UserSchema.find({});

    res.json({ message: "all users retrieved successfully", docs: users });
  } catch (error) {
    next(error);
  }
};

const newUser = async (req, res, next) => {
  try {
    const { name, positionName } = req.body;

    await UserSchema.create({
      name: name,
      positionName: positionName,
    });

    res.json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

const userDetails = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const user = await UserSchema.findById({
      _id: _id,
    });

    res.json({ message: "user retrieved successfully ", docs: user });
  } catch (error) {
    next(error);
  }
};

const modifyUser = async (req, res, next) => {
  try {
    const { _id, name, positionName, projectLead } = req.body;

    const user = await UserSchema.findByIdAndUpdate(
      {
        _id: _id,
      },
      { name: name, positionName: positionName, projectLead: projectLead }
    );

    res.json({ message: "user retrieved successfully ", docs: user });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const { _id } = req.body;

    //check if there is a project assigned to him
    const projects = await ProjectSchema.find({ projectLead: _id });

    if (projects.length === 0) {
      for (let i = 0; i < projects.length; i++) {
        await projectSchema.findOneAndUpdate(
          { _id: projects[i]._id },
          { projectLead: "" }
        );
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

module.exports = { allUsers, newUser, userDetails, modifyUser, removeUser };
