const { Food, Review, Restaurant, User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { signer } = require("../helpers/jwtoken");
const { OAuth2Client } = require("google-auth-library");
const oauth2Client = new OAuth2Client();

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
  static async getLoc(req, res, next) {
    try {
      const maps = await Restaurant.findByPk(req.params.id);
      res.status(200).json(maps);
    } catch (error) {
      next(error);
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
      const jwtok = signer({ id: user.id });
      res.status(200).json({ access_token: jwtok, rank: user.rank });
    } catch (error) {
      next(error);
    }
  }
  static async googleLog(req, res, next) {
    try {
      console.log(req.headers);
      const ticket = await oauth2Client.verifyIdToken({
        idToken: req.headers["google-token"],
        audience:
          "142608278006-uk72gb20co2g3ej50hrjvse09o17oc0q.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        const newUser = await User.create({
          username: payload.given_name,
          email: payload.email,
          password: "dummy" + Date.now(),
          rank: "Basic",
        });
      }
      const access_token = signer({ id: newUser.id, rank: newUser.rank });
      res.status(200).json({ access_token });
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
