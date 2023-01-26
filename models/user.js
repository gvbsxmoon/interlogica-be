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

UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User = mongoose.model("user", UserSchema);
