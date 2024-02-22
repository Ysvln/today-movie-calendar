const express = require("express");
const isLoggedIn = require("../../middlewares/auth.middleware");

const {
  getMoviesAndUserWatchedMovies,
  getMoviesAndUserWatchedMoviesByDate,
} = require("../../controllers/calendar.controller");

const calendarRouter = express.Router();

calendarRouter.get(
  "/day/:date",
  isLoggedIn,
  getMoviesAndUserWatchedMoviesByDate
);
calendarRouter.get("/:year/:month", isLoggedIn, getMoviesAndUserWatchedMovies);

module.exports = calendarRouter;
