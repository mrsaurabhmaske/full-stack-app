const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const UserModel = new mongoose.model("user", userSchema);

module.exports = { UserModel };
