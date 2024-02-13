if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const Controller = require("../controllers/controller");
const { errorManager } = require("../middlewares/errormanager");
const router = express.Router();

router.get("/", Controller.home);
router.get("/foods", Controller.getFood)

router.use(errorManager)
module.exports = router;