const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RoleSchema = new mongoose.Schema({
  auth: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [RoleSchema],
    required: false,
  },
});

UserSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model("user", UserSchema);
