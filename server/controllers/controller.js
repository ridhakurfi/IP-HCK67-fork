const { Food } = require("../models");
class Controller {
  static async home(req, res, next) {
    try {
      res.status(200).json({ message: "Halo Duniaku" });
    } catch (error) {
      next(error);
    }
  }
  static async getFood(req, res, next){
    try {
      const food = await Food.findAll()
      res.status(200).json(food)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;