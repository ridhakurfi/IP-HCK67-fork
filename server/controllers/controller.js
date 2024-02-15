const { Food, Review, Restaurant, User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signer } = require("../helpers/jwtoken");

class Controller {
  static async home(req, res, next) {
    try {
      res.status(200).json({ message: "Halo Duniaku" });
    } catch (error) {
      next(error);
    }
  }
  static async getReviews(req, res, next) {
    try {
      const food = await Review.findAll({
        include: [
          {
            model: Food,
            include: {
              model: Restaurant,
            },
          },
        ],
      });
      res.status(200).json(food);
    } catch (error) {
      next(error);
    }
  }
  static async getLoc(req,res,next){
    try {
      const maps = await Restaurant.findByPk(req.params.id)
      res.status(200).json(maps)
    } catch (error) {
      next(error)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (
        email === undefined ||
        email === "" ||
        password === undefined ||
        password === ""
      )
        throw { name: "NoInput" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "WrongPass" };
      const a = compare(password, user.password);
      if (a === false) throw { name: "WrongPass" };
      const jwtok = signer({ role: user.role, id: user.id });
      res.status(200).json({ access_token: jwtok });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const user = await User.create({ ...req.body, rank: "Basic" });
      res.status(201).json({ message: "Succes registered" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
