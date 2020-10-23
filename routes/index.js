var express = require("express");
const models = require("../models");
var router = express.Router();

var TreasureController = require("../controllers/treasureController");
var UserController = require("../controllers/userController");
var MoneyController = require("../controllers/moneyController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/treasure", TreasureController.post);

router.get("/treasure", TreasureController.get);

router.get("/findTreasure", TreasureController.findTreasure);

router.post("/user", UserController.post);

router.get("/user", UserController.get);

router.post("/moneyValue", MoneyController.post);

router.get("/moneyValue", MoneyController.get);

module.exports = router;
