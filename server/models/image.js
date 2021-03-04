const Sequelize = require("sequelize");

class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        src: { type: Sequelize.STRING(300), allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Image", // 시퀄에서 사용되는 이름
        tableName: "images", //db에 저장되는 이름
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      },
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
}

module.exports = Image;
