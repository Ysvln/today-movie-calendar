const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
    req.user = decoded.user;
    next();
  });

  // 세션방식..
  // if (req.isAuthenticated()) {
  //   next();
  // } else {
  //   res.status(403).json({ message: "로그인이 필요합니다." });
  // }
};

module.exports = isLoggedIn;
