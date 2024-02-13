class Controller {
  static async home(req, res, next) {
    try {
      res.status(200).json({ message: "Halo Duniaku" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;