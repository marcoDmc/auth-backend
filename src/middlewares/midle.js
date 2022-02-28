const jwt = require("jsonwebtoken");

require('dotenv').config()

module.exports = {
  auth(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth) return res.status(400).json({ error: "token not received ❗" });

    const authConfig = auth.split(" ");

    if (!authConfig.length === 2)
      return res.status(400).json({ error: "invalid token❗" });

    const [Bearer, token] = authConfig;

    if (!/^Bearer$/i.test(Bearer))
      return res.status(400).json({
        error: "the token sent does not match the jsonwebtoken format❗",
      });

    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err)
        return res.status(400).json({
          error: "the sent token does not match the generated token❗",
        });

      req.userId = decode.id;
      return next();
    });
  },
};
