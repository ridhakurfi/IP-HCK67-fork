const bcrypt = require("bcrypt");

const hasher = (plain) => {
  return bcrypt.hashSync(plain, bcrypt.genSaltSync(8));
};
const compare = (plain, hashed) =>{
  return bcrypt.compareSync(plain, hashed)
}

module.exports = { hasher, compare };