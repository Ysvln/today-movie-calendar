const Sequelize = require("sequelize");

class Movie extends Sequelize.Model {
  static initiate(sequelize) {
    Movie.init(
      {
        // 영화 제목
        title: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        // 감독명
        directorNm: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        // 배우명
        actorNm: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        // 제작사
        company: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        // 제작년도
        prodYear: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        // 줄거리
        plot: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        // 대표상영시간
        runtime: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        // 대표관람등급
        rating: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        // 장르
        genre: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        // 개봉일
        releaseDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        // 포스터 이미지 url
        posterUrl: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Movie",
        tableName: "movies",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Movie.hasOne(db.Review);
  }
}

module.exports = Movie;
