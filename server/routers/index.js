if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const Controller = require("../controllers/controller");
const { errorManager } = require("../middlewares/errormanager");
const { authenticate } = require("../middlewares/authenticator");
const router = express.Router();

router.get("/", Controller.home);
router.post("/login", Controller.login);
router.post("/login/google", Controller.googleLog)
router.post("/register", Controller.register);
router.use(authenticate)
router.get("/reviews", Controller.getReviews);
router.get("/maps/:id", Controller.getLoc);
router.get("/user", Controller.getUser)

router.use(errorManager);
module.exports = router;
