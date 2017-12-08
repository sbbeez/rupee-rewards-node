const mongoose = require("mongoose");
const User = mongoose.model("user");
const Reward = mongoose.model("reward");
const moment = require("moment");
const keys = require("../config/keys");
const jwt = require("jwt-simple");
const regexDigits = /^\d+$/;

exports.signUp = (req, res) => {
  const body = req.body;
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = body.email;
  const phone = body.phone;
  const gender = body.gender;
  const date_of_birth = body.date_of_birth;
  if (phone.toString().length !== 10 || !regexDigits.test(phone) || !phone) {
    return res.send({ message: "Please enter valid Phone Number" });
  }
  if (!(email.toString().length > 7) || !regexEmail.test(email) || !email) {
    return res.send({ message: "Please enter valid Email ID" });
  }
  if (!(gender === "male" || gender === "female") || !gender) {
    return res.send({ message: "Please enter a valid Gender" });
  }
  if (
    !(
      moment(date_of_birth, "DD-MM-YYYY").isValid() &&
      moment(date_of_birth).isAfter("1950-01-01") &&
      moment(date_of_birth).isBefore("2010-01-01")
    ) ||
    !date_of_birth
  ) {
    return res.send({ message: "Please enter a valid Date Of Birth" });
  }
  new User(body)
    .save()
    .then(user => {
      res.send({ phone: body.phone });
    })
    .catch(err => {
      if (err.code === 11000) {
        res.send({
          message:
            "This Email ID or Phone Number is already taken, Please login"
        });
      }
    });
};

exports.signIn = (req, res) => {
  const phone = req.body.phone;
  if (!phone || !regexDigits.test(phone) || !(phone.length === 10)) {
    return res.send({ message: "Please enter a valid Phone Number" });
  }
  User.findOne({ phone: phone }, (err, existingPhone) => {
    if (existingPhone) {
      return res.send({ phone: existingPhone.phone });
    } else {
      return res.send({
        message: "Your number is not registered, Please Sign Up"
      });
    }
  });
};

exports.verifyOtp = (req, res) => {
  const phone = req.body.phone;
  const otp = req.body.otp;
  if (!phone || !regexDigits.test(phone) || phone.toString().length !== 10) {
    return res.send({ message: "Please enter a valid Phone Number" });
  }
  if (!otp || !regexDigits.test(otp) || !(otp.toString().length === 4)) {
    return res.send({ message: "Please enter a valid OTP" });
  }
  User.findOne({ phone: phone }, (err, user) => {
    User.updateOne(
      { _id: user.id },
      { token: generateToken(user) }
    ).then(modifiedStatus => {
      new Reward({ _user: user.id }).save().then(reward => {
        res.send({ message: "success", token: generateToken(user) });
      });
    });
  });
};

const generateToken = user => {
  return jwt.encode({ sub: user.id }, keys.jwtSecretCode);
};
