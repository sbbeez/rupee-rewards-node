const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const adminUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() }
});

adminUserSchema.pre("save", function(next) {
  const admin = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(admin.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      admin.password = hash;
      next();
    });
  });
});

adminUserSchema.methods.comparePassword = function(
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const adminUserModel = mongoose.model("admin_user", adminUserSchema);

exports.module = adminUserModel;
