const AdminController = require("../controllers/AdminAuthController");
const passportServices = require("../services/adminPassport");
const passport = require("passport");

const requireCrendetials = passport.authenticate("local", { session: false });

module.exports = app => {
  app.post("/adminsignin", requireCrendetials, AdminController.signin);
  app.post("/adminsignup", AdminController.signup);
};
