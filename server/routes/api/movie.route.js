const express = require("express");
const cron = require("node-cron");
const isLoggedIn = require("../../middlewares/auth.middleware");

const {
  getMoviesInfo,
  getMovieDetailInfoWithReview,
  searchMovieWithTitle,
} = require("../../controllers/movie.controller");

const movieRouter = express.Router();

cron.schedule("0 0 * * *", () => {
  console.log("영화 정보 가져오기 작업 시작");
  console.log(new Date(), "작업한 시간");
  getMoviesInfo();
});

// 영화 검색
movieRouter.get("/", isLoggedIn, searchMovieWithTitle);

// 영화 상세 정보 가져오기
movieRouter.get("/:movieId", isLoggedIn, getMovieDetailInfoWithReview);

module.exports = movieRouter;
