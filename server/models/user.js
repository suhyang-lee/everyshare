const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
        password: { type: Sequelize.STRING(100), allowNull: false },
        nickname: { type: Sequelize.STRING(20), allowNull: false },
        phonenumber: { type: Sequelize.INTEGER, allowNull: true },
        profileUrl: {
          type: Sequelize.STRING(300),
          defaultValue:
            "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png",
          allowNull: true,
        },
        provider: { type: Sequelize.STRING(15), allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);

    db.User.belongsToMany(db.Post, { through: "Basket", as: "Zzimed" });

    db.User.belongsToMany(db.Comment, {
      as: "Liker",
      through: "Like",
    });
  }
}

module.exports = User;
