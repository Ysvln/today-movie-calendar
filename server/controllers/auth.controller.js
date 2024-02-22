const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../services/email.service");

// 회원가입
const signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.status(403).json({ message: "이미 가입된 이메일입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return res.status(200).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 로그인
const login = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    //done
    if (authError) {
      // 서버 실패
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      // 로직 실패
      return res.status(401).send(info.message);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 로그인 성공
      // const { id } = user;
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
      res.cookie("isUser", 1, { maxAge: 86400000 });

      return res.status(200).json({ message: "로그인에 성공했습니다." });
    });
  })(req, res, next);
};

// 로그아웃
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      next(err);
      return res.status(401).json({ message: "로그아웃에 실패했습니다." });
    }
    req.session.destroy();
    res.cookie("token", null, {
      // 쿠키에 null 값을 전달해주고 쿠키의 만료 시간을 0으로 설정
      // 클라이언트가 쿠키를 바로 만료시키도록 전달
      maxAge: 0,
    });
    res.clearCookie("isUser");
    res.clearCookie("token");
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "로그아웃 성공" });
  });
};

/**
 * @todo redis 사용해서 이메일 저장 및 저장 시간 set
 */
// 이메일 인증 요청
// 인증 코드 => 임시로 메모리에 저장

const verificationCodes = {};

const requestVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(403).json({ message: "이미 가입된 이메일입니다." });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await sendVerificationEmail(email, code);

    verificationCodes[email] = code;
    // redisClient.setex(email, 300, verificationCode);
    return res
      .status(200)
      .json({ message: "이메일 인증 코드가 전송되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 이메일 인증 완료
const completeVerificationEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // 메모리에 저장된 인증 코드와 비교
    if (verificationCodes[email] !== code) {
      return res
        .status(400)
        .json({ message: "인증 코드가 일치하지 않습니다." });
    }

    return res.status(200).json({ message: "이메일 인증이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  requestVerificationEmail,
  completeVerificationEmail,
};
