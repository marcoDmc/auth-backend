const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const model = mongoose.model("users", userSchema);

module.exports = model;
