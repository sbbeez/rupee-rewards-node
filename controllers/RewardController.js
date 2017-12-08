const mongoose = require("mongoose");
const User = mongoose.model("user");
const Reward = mongoose.model("reward");
const AdsWatched = mongoose.model("adswatched");
const moment = require("moment");

const regexNumber = /^\d+$/;

exports.getRewards = (req, res) => {
  Reward.findOne({ _user: req.user.id }).then(reward => {
    res.send({
      reward: reward.rewards,
      last_active: moment(reward.last_active)
    });
  });
};

exports.addRewards = (req, res) => {
  let rewards = req.body.rewards;
  if (!rewards || !regexNumber.test(rewards)) {
    return res.send({ message: "Please add a valid reward" });
  }
  let date_time = Date.now();
  Reward.updateOne(
    { _user: req.user.id },
    { $inc: { rewards: req.body.rewards }, last_active: date_time }
  ).then(reward => {
    new AdsWatched({ _user: req.user.id, ad_watched_at: date_time })
      .save()
      .then(response => {
        res.send({ message: "Your rewards are successfully added" });
      });
  });
};
