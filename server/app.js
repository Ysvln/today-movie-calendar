const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const redis = require("redis");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const apiRouter = require("./routes");
const { sequelize } = require("./models");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");

dotenv.config({ path: path.join(__dirname, "/.env") }); // process.env

const passportConfig = require("./passport");
const app = express();
passportConfig();
app.set("port", process.env.PORT || 80);

// sequelize
//   .sync({force : true}) => 개발용! 테이블 잘못 만들었을 때 설정하고 서버 재시작하면, 테이블 다 제거
sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((Err) => {
    console.error(Err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // 배포 combined
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "todaymovie.com",
      "http://54.180.120.78",
      "https://today-movie-calendar.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json()); // req.body를 ajax json 요청으로부터
app.use(express.urlencoded({ extended: false })); // req.body 폼으로부터
app.use(cookieParser(process.env.COOKIE_SECRET)); // {connect.sid: 1234568754}

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, // js 접근 X
  },
};

app.use(session(sessionOption));

app.get("/", (req, res) => {
  res.send("hello express");
});

// express session 하단에
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout
app.use(passport.session());

app.use("/api", apiRouter);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 실행");
});
