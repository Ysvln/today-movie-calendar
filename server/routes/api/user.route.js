const express = require("express");
const {
  getUserInfo,
  patchUserName,
  deleteUser,
} = require("../../controllers/user.controller");
const isLoggedIn = require("../../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.get("/", isLoggedIn, getUserInfo);
userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.patch("/name", isLoggedIn, patchUserName);

module.exports = userRouter;
