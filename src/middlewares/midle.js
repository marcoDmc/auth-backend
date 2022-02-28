const jwt = require("jsonwebtoken");
const authSecret = require("../auth/auth.json");

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

    jwt.verify(token, authSecret.secret, (err, decode) => {
      if (err)
        return res.status(400).json({
          error: "the sent token does not match the generated token❗",
        });

      req.userId = decode.id;
      return next();
    });
  },
};
