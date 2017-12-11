const mongoose = require("mongoose");
const passportServices = require("../services/passport");
const passport = require("passport");
const RewardController = require("../controllers/RewardController");

const checkToken = passport.authenticate("userLogin", { session: false });

module.exports = app => {
  app.get("/getRewards", checkToken, RewardController.getRewards);
  app.post("/addRewards", checkToken, RewardController.addRewards);
};
