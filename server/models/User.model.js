const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    positionName: {
      type: String,
      enum: [
        "FrontEnd Developer",
        "BackEnd Developer",
        "Project Lead",
        "Full Stack Developer",
        "Manager",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("user", User);
module.exports = UserSchema;
