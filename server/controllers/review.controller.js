const Review = require("../models/review.model");
const Movie = require("../models/movie.model");
const { Op } = require("sequelize");

// 리뷰 작성 및 별점 작성 => 관람일은 오늘로 고정
const postReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;
    const { rating, content } = req.body;

    const watchedAt = new Date();

    const existingReview = await Review.findOne({
      where: { UserId: userId, MovieId: movieId },
    });
    if (existingReview) {
      return res.status(400).json({ message: "이미 작성한 리뷰입니다." });
    }

    const review = await Review.create({
      watchedAt,
      rating,
      content,
      UserId: userId,
      MovieId: movieId,
    });

    res.status(200).json({
      id: review.id,
      watchedAt: review.watchedAt,
      rating: review.rating,
      content: review.content,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 관람일, 별점, 컨텐츠 수정
const patchReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;
    const { watchedAt, rating, content } = req.body;

    let review = await Review.findOne({
      where: { UserId: userId, MovieId: movieId },
      attributes: ["id", "MovieId", "watchedAt", "rating", "content"],
    });

    if (!review) {
      return res.status(404).json({ message: "해당하는 리뷰가 없습니다." });
    }

    if (watchedAt) {
      // 서버 시간 차이 수정하기
      const newWatchedAt = new Date(watchedAt);
      const watchedAtInDatabaseDate = new Date(review.watchedAt);

      if (
        !review.watchedAt ||
        newWatchedAt.getTime() !== watchedAtInDatabaseDate.getTime()
      ) {
        review.watchedAt = newWatchedAt;
      }
    }

    // rating이 주어진 경우 업데이트
    review.rating = rating || review.rating;
    // content가 주어진 경우 업데이트
    review.content = content || review.content;

    await review.save();

    res.status(200).json({
      id: review.id,
      watchedAt: review.watchedAt,
      rating: review.rating,
      content: review.content,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 리뷰 삭제
const deleteReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;
    const { reviewId } = req.body;

    await Review.destroy({
      where: {
        // 게시글 id
        id: reviewId,
        // 나의 게시글만 삭제 가능
        UserId: userId,
      },
    });

    res.status(200).json({
      movieId: parseInt(movieId, 10),
      message: "리뷰를 삭제했습니다.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저가 관람일 작성한 영화
const getMyWatchedMovie = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const review = await Review.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Movie,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const movies = review.map((review) => review.Movie);

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//유저가 코멘트 작성한 영화
const getMyCommentedMovie = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const review = await Review.findAll({
      where: { UserId: userId, content: { [Op.not]: null } },
      include: [
        {
          model: Movie,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const movies = review.map((review) => review.Movie);

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저가 별점 작성한 영화
const getMyRatingMovie = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const review = await Review.findAll({
      where: { UserId: userId, rating: { [Op.not]: null } },
      include: [
        {
          model: Movie,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const movies = review.map((review) => review.Movie);

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  postReview,
  patchReview,
  deleteReview,
  getMyWatchedMovie,
  getMyCommentedMovie,
  getMyRatingMovie,
};
