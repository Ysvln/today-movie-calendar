const Movie = require("../models/movie.model");
const Review = require("../models/review.model");
const axios = require("axios");
const { Op } = require("sequelize");
const { excludeGenre, normalizeReleaseDate } = require("../util/movie");

// 영화 데이터 수집
const RELEASE_YEAR = "2024";
const LIST_COUNT = 300;
let startCount = 0;

const getMoviesInfo = async () => {
  try {
    const response = await axios.get(process.env.MOVIE_API_URL, {
      params: {
        collection: "kmdb_new2",
        ServiceKey: process.env.MOVIE_API_KEY,
        releaseDts: RELEASE_YEAR,
        listCount: LIST_COUNT,
        startCount,
      },
    });

    const movies = response.data.Data;

    const movieSavePromises = movies[0].Result.map(async (movieData) => {
      const repRlsDate = movieData.repRlsDate;
      const normalizedReleaseDate = normalizeReleaseDate(repRlsDate);
      const releaseDate = new Date(normalizedReleaseDate);

      // 배제하고 싶은 장르
      if (!excludeGenre(movieData.genre)) {
        return;
      }
      const movie = {
        title: movieData.title,
        directorNm: Array.isArray(movieData.directors.director)
          ? movieData.directors.director[0].directorNm
          : movieData.directors.director.directorNm,
        actorNm: movieData.actors.actor
          ? movieData.actors.actor
              .slice(0, 10)
              .map((actor) => actor.actorNm)
              .join(", ")
          : "",
        company: movieData.company,
        prodYear: movieData.prodYear,
        plot: movieData.plots ? movieData.plots.plot[0].plotText : "",
        runtime: movieData.runtime,
        rating: movieData.rating,
        genre: movieData.genre,
        releaseDate,
        posterUrl: movieData.posters,
      };

      try {
        const exMovie = await Movie.findOne({
          where: { title: movie.title, directorNm: movie.directorNm },
        });
        if (!exMovie) {
          const createdMovie = await Movie.create(movie);
          console.log("영화 저장 성공", createdMovie);
        }
      } catch (error) {
        console.error("영화 저장 실패:", error);

        throw error;
      }
    });

    await Promise.all(movieSavePromises);

    startCount += LIST_COUNT;
  } catch (error) {
    console.error("영화 api 호출 에러 : ", error);
  }
};

// 해당 유저의 리뷰를 포함한 영화 상세 정보
const getMovieDetailInfoWithReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const movieDetailInfo = await Movie.findOne({
      where: { id: movieId },
    });

    if (movieDetailInfo == null) {
      return res.status(400).json({
        message: "해당하는 영화가 없습니다.",
      });
    }

    const userReview = await Review.findOne({
      where: { MovieId: movieId, UserId: userId },
      attributes: ["id", "watchedAt", "rating", "content"],
    });

    const review = userReview ? userReview : null;

    const movieDetailInfoWithReview = {
      ...movieDetailInfo.toJSON(),
      Review: review,
    };

    res.status(200).json(movieDetailInfoWithReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 영화 제목으로 검색
const searchMovieWithTitle = async (req, res, next) => {
  try {
    const { title, page, limit } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const offset = (pageNumber - 1) * limit;

    const movies = await Movie.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${title}%` } }],
      },
      limit: limitNumber,
      offset: offset,
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getMoviesInfo,
  getMovieDetailInfoWithReview,
  searchMovieWithTitle,
};
