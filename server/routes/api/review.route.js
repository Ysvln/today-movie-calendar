const express = require("express");
const isLoggedIn = require("../../middlewares/auth.middleware");

const {
  postReview,
  patchReview,
  deleteReview,
  getMyWatchedMovie,
  getMyCommentedMovie,
  getMyRatingMovie,
} = require("../../controllers/review.controller");

const reviewRouter = express.Router();

// 리뷰 작성
reviewRouter.post("/:movieId", isLoggedIn, postReview);

// 리뷰 수정
reviewRouter.patch("/:movieId", isLoggedIn, patchReview);

// 리뷰 삭제
reviewRouter.delete("/:movieId", isLoggedIn, deleteReview);

// 유저가 관람일 작성한 영화 리스트
reviewRouter.get("/watched", isLoggedIn, getMyWatchedMovie);

// 유저가 코멘트 작성한 영화 리스트
reviewRouter.get("/commented", isLoggedIn, getMyCommentedMovie);

// 유저가 별점 작성한 영화 리스트
reviewRouter.get("/rating", isLoggedIn, getMyRatingMovie);

module.exports = reviewRouter;
