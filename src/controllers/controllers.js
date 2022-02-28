const model = require("../model/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



function generatedToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  });
}

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ error: "something is missing 🙄" });
      }
      const compareEmail = await model.findOne({ email: email });
      if (compareEmail) {
        return res.status(400).json({ error: "this user already exists 😐" });
      }
      const user = await model.create(req.body);

      user.password = undefined;

      return res
        .status(200)
        .json({ user, token: generatedToken({ id: user.id }) });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "não foi possivel criar o usuario 😪" });
    }
  },

  async authenticated(req, res) {
    const { email, password } = req.body;

    const user = await model.findOne({ email: email }).select("+password");
    if (!user) return res.status(400).send("user does not exist 🚨");

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("incorrect password 🔒");
    }

    user.password = undefined;

    return res
      .status(200)
      .json({ user, token: generatedToken({ id: user.id }) });
  },

  async getUser(req, res) {
    const user = await model.find();
    return res.status(200).json(user);
  },
};

