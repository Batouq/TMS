const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    projectManager: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("User", User);
module.exports = UserSchema;
