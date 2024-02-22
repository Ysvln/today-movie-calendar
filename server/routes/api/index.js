const express = require("express");
const apiRouter = express.Router();

//
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const movieRouter = require("./movie.route");
const reviewRouter = require("./review.route");
const calendarRouter = require("./calendar.route");

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/movie", movieRouter);
apiRouter.use("/review", reviewRouter);
apiRouter.use("/calendar", calendarRouter);

module.exports = apiRouter;
