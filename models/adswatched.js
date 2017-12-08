const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdsWatchedSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ad_watched_at: { type: Date, required: true }
});

const AdsWatchedModel = mongoose.model("adswatched", AdsWatchedSchema);

exports.module = AdsWatchedModel;
