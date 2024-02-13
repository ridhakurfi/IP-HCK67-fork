const { verifier } = require("../helpers/jwtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthorized" };
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "Unauthorized" };
    const payload = verifier(token);
    const valid = await User.findByPk(payload.id);
    if (!valid) throw { name: "Unauthorized" };
    req.user = { id: payload.id };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
