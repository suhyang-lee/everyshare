const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        contents: { type: Sequelize.TEXT, allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Comment", // 시퀄에서 사용되는 이름
        tableName: "comments", //db에 저장되는 이름
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      },
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsTo(db.User);
    db.Comment.belongsToMany(db.User, {
      foreignKey: "likerId",
      through: "Like",
      as: "LikerList",
    });
  }
}

module.exports = Comment;
