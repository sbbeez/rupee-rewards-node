const AdminDashboardController = require("../controllers/AdminDashboardController");
const passportServices = require("../services/adminPassport");
const passport = require("passport");

const requireToken = passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.get(
    "/dashboardDetails",
    requireToken,
    AdminDashboardController.dashboardDetails
  );
};
