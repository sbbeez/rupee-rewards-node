const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const userSchema = new Schema({
  phone: {
    type: Number,
    unique: [true, "This number already exists, Please Sign up"],
    required: [true, "Phone number is required"]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please enter a valid Email ID"]
  },
  gender: {
    type: String,
    required: [true, "Please enter a valid Gender"]
  },
  date_of_birth: {
    type: Date,
    required: [true, "Please enter a valid Date of Birth"]
  },
  sign_up_date: {
    type: Date,
    default: Date.now()
  },
  token:{
    type:String,
    default: null
  }
});

const UserModel = mongoose.model("user", userSchema);

exports.module = UserModel;
