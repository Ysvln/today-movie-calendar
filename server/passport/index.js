const passport = require("passport");
const local = require("./strategies/local.strategy");
const kakao = require("./strategies/kakao.strategy");
const User = require("../models/user.model");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
  kakao();
};
