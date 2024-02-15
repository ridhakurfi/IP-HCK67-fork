if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const Controller = require("../controllers/controller");
const { errorManager } = require("../middlewares/errormanager");
const { authenticate } = require("../middlewares/authenticator");
const router = express.Router();

router.get("/", Controller.home);
router.get("/reviews", Controller.getReviews);
router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.use(authenticate)

router.use(errorManager);
module.exports = router;
