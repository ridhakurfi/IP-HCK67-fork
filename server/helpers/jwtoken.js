const jwt = require("jsonwebtoken");

const signer = (payload) => {
  return jwt.sign(payload, process.env.RAHASIA);
};

const verifier = (token) => {
  return jwt.verify(token, process.env.RAHASIA);
};

module.exports = { signer, verifier };