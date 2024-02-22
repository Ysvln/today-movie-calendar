const User = require("../models/user.model");
const Review = require("../models/review.model");
const { Op } = require("sequelize");

const getUserInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({ where: { id: req.user.id } });

      const watchedMovieCount = await Review.count({
        where: { userId: user.id, watchedAt: { [Op.ne]: null } },
      });

      const commentedMovieCount = await Review.count({
        where: { userId: user.id, content: { [Op.ne]: null } },
      });

      const ratingMovieCount = await Review.count({
        where: { userId: user.id, rating: { [Op.ne]: null } },
      });

      const { id, email, name } = user;

      res.status(200).json({
        id,
        email,
        name,
        watchedMovieCount,
        commentedMovieCount,
        ratingMovieCount,
      });
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const patchUserName = async (req, res, next) => {
  try {
    await User.update(
      {
        name: req.body.name,
      },
      {
        where: { id: req.user.id },
      }
    );

    res
      .status(200)
      .json({ name: req.body.name, message: "유저 이름 변경 성공" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (!deletedUser) {
      return res.status(400).json({ message: "유저가 존재하지 않습니다." });
    }
    res.clearCookie("isUser");
    res.clearCookie("token");
    res.clearCookie("connect.sid");
    req.session.destroy();
    return res.status(200).json({ message: "탈퇴 성공" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getUserInfo,
  patchUserName,
  deleteUser,
};
