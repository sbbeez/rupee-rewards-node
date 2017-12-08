const mongoose = require("mongoose");
const Admin = mongoose.model("admin_user");
const keys = require("../config/keys");
const jwt = require("jwt-simple");
const moment = require("moment");

const generateToken = admin => {
  return jwt.encode({ sub: admin.id }, keys.jwtSecretCode);
};
exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !password) {
    return res
      .status(422)
      .send({ message: "Please enter valid username and password" });
  }
  if (!(email.toString().length > 7) || !regexEmail.test(email)) {
    return res.status(422).send({ message: "Please enter valid Email ID" });
  }
  new Admin(req.body)
    .save()
    .then(admin => {
      res.json({ token: generateToken(admin) });
    })
    .catch(error => {
      if (error.code === 11000) {
        return res
          .status(422)
          .send({ message: "This email ID is already taken" });
      }
    });
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send("Please provide both email id and password");
  }
  Admin.findOne({ email: email }, (err, admin) => {
    if (admin) {
      return res.send({ token: generateToken(admin) });
    } else {
      return res.send("please enter a valid Email id or password");
    }
  });
};
