const Movie = require("../models/movie.model");
const Review = require("../models/review.model");
const { Op, literal } = require("sequelize");

// 해당하는 연, 월에 개봉하는 영화 및 유저가 관람한 영화 목록 반환
const getMoviesAndUserWatchedMovies = async (req, res, next) => {
  const { year, month } = req.params;
  const userId = req.user.id;
  try {
    const nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1;
    const nextYear =
      parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year);

    const startDate = `${year}-${month}-01`;
    const endDate = `${nextYear}-${nextMonth}-01`;

    const moviesReleasedInMonth = await Movie.findAll({
      where: {
        releaseDate: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      attributes: ["title", "releaseDate"],
    });

    // 해당 유저가 시청한 영화 중에서 해당 연월 범위 내에 있는 영화 검색
    const userWatchedMoviesInMonth = await Review.findAll({
      where: {
        UserId: userId,
        watchedAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      include: [
        {
          model: Movie,
          attributes: ["title"],
        },
      ],
      attributes: ["watchedAt"],
    });

    res.status(200).json({ moviesReleasedInMonth, userWatchedMoviesInMonth });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getMoviesAndUserWatchedMoviesByDate = async (req, res, next) => {
  const { date } = req.params;
  const userId = req.user.id;

  try {
    const newDate = new Date(date);
    const startDate = new Date(`${date}T00:00:00+09:00`);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const moviesReleasedOnDate = await Movie.findAll({
      where: {
        releaseDate: newDate,
      },
      attributes: ["id", "title", "releaseDate"],
    });

    // 해당 유저가 시청한 영화 중에서 해당 연월일에 있는 영화 검색
    const userWatchedMovies = await Review.findAll({
      where: {
        UserId: userId,
        watchedAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      include: [
        {
          model: Movie,
          attributes: ["title", "id"],
        },
      ],
    });

    const userWatchedMoviesInDate = userWatchedMovies.map((movie) => ({
      id: movie.Movie.id,
      title: movie.Movie.title,
    }));

    res.status(200).json({ moviesReleasedOnDate, userWatchedMoviesInDate });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getMoviesAndUserWatchedMovies,
  getMoviesAndUserWatchedMoviesByDate,
};
