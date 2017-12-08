const mongoose = require("mongoose");
const User = mongoose.model("user");
const Reward = mongoose.model("reward");

exports.getRewards = (req, res) => {
  Reward.findOne({ _user: req.user.id }).then(reward => {
    res.send(reward);
  });
};
