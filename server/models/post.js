const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postType: {
          type: Sequelize.STRING(10),
          allowNull: false,
          validate: {
            isIn: [["owner", "borrower"]],
          },
        }, //1: owner 2: borrower
        category: {
          type: Sequelize.STRING(15),
          allowNull: false,
          validate: {
            isIn: [
              [
                "digital",
                "kids",
                "goods",
                "clothing",
                "sports",
                "hobby",
                "etc",
              ],
            ],
          },
        },
        rentTerm: {
          type: Sequelize.STRING(10),
          allowNull: false,
          validate: {
            isIn: [["long", "short"]],
          },
        }, //1: long 2: short
        title: { type: Sequelize.STRING(100), allowNull: false },
        contents: { type: Sequelize.TEXT, allowNull: true },
        priceType: {
          type: Sequelize.STRING(10),
          allowNull: false,
          validate: {
            isIn: [["day", "month", "year"]],
          },
        }, //1:day 2:month 3: year
        price: { type: Sequelize.DOUBLE, allowNull: false },
        deposit: { type: Sequelize.DOUBLE, allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post", // 시퀄에서 사용되는 이름
        tableName: "posts", //db에 저장되는 이름
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      },
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.History);
    db.Post.belongsToMany(db.User, { through: "Basket", as: "Basketer" });
  }
}

module.exports = Post;
