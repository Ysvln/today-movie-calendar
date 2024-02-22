const Sequelize = require("sequelize");

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        watchedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Review",
        tableName: "reviews",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Review.belongsTo(db.User);
    db.Review.belongsTo(db.Movie);
  }
}

module.exports = Review;
