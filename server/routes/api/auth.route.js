const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {
  signUp,
  login,
  logout,
  requestVerificationEmail,
  completeVerificationEmail,
} = require("../../controllers/auth.controller");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

authRouter.post("/mail", requestVerificationEmail);
authRouter.post("/mail/check", completeVerificationEmail);

//카카오 로그인
authRouter.get("/kakao", passport.authenticate("kakao"));
authRouter.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    // signinerror page
    failureRedirect: "/",
    authInfo: true,
  }),
  (req, res) => {
    const { id, name, email } = req.user.dataValues;

    const user = { id, email, name };
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
    res.cookie("isUser", 1, { maxAge: 86400000 });
    res.redirect("http://54.180.120.78/calendar");
  }
);

module.exports = authRouter;
