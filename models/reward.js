const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  rewards: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  last_active: { type: Date, default: Date.now() }
});

const RewardModel = mongoose.model("reward",rewardSchema);

exports.module = RewardModel;
