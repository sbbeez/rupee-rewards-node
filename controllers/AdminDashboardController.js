const mongoose = require("mongoose");
const Admin = mongoose.model("admin_user");
const User = mongoose.model("user");
const Reward = mongoose.model("reward");
const AdsWatched = mongoose.model("adswatched");
const moment = require("moment");

const today = moment().startOf("day");
const tomorrow = moment(today).add(1, "days");

const adsWatched = async (res, dashboard) => {
  dashboard.total_ad_watched = await AdsWatched.find({
    ad_watched_at: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    }
  }).count();
  dashboard.active_user_count = await AdsWatched.find({
    ad_watched_at: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    }
  })
    .distinct("_user")
    .count();
  res.send(dashboard);
};

exports.dashboardDetails = async (req, res) => {
  let dashboard = {};
  dashboard.total_users = await User.count({});
  dashboard.signup_today = await User.find({
    sign_up_date: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    }
  }).count();
  dashboard.recent_signup = await User.find({}, "email gender phone")
    .sort({ sign_up_date: 1 })
    .limit(3);

  adsWatched(res, dashboard);
};
