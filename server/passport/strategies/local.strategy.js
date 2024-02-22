const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

const passportOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: false,
};

const verifyUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "비밀번호가 일치하지 않습니다.",
        });
      }
    } else {
      return done(null, false, {
        message: "존재하지 않는 사용자 입니다.",
      });
    }
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

const local = new LocalStrategy(passportOptions, verifyUser);

module.exports = () => {
  passport.use(local);
};
