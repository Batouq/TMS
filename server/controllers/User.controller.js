const UserSchema = require("../models/User.model");

const allUsers = async (req, res, next) => {
  try {
    const users = await UserSchema.find({});

    res.json({ message: "all users retrieved successfully", docs: users });
  } catch (error) {
    next(error);
  }
};

module.exports = { allUsers };
