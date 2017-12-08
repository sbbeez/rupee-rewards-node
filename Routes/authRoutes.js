const AuthControllers = require("../controllers/AuthControllers");

module.exports = app => {
  app.post("/signup", AuthControllers.signUp);

  app.post("/signin", AuthControllers.signIn);

  app.post("/verifyotp", AuthControllers.verifyOtp);
};
