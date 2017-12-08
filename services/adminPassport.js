const passport = require("passport");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const Admin = mongoose.model("admin_user");

const jwtAdminOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.jwtSecretCode
};
const jwtAdminToken = new JwtStrategy(jwtAdminOptions, (payload, done) => {
  Admin.findById(payload.sub, (err, adminUser) => {
    if (err) {
      return done(err, false);
    }
    if (adminUser) {
      return done(null, adminUser);
    } else {
      return done(null, false);
    }
  });
});

const localAdminOptions = { usernameField: "email" };
const jwtAdminLogin = new LocalStrategy(
  localAdminOptions,
  (email, password, done) => {
    Admin.findOne({ email: email }, (err, admin) => {
      if (err) {
        return done(err, false);
      }
      if (!admin) {
        return done(null, false);
      }
      admin.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, admin);
      });
    });
  }
);

passport.use(jwtAdminLogin);
passport.use(jwtAdminToken);
