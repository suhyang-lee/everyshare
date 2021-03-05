const Sequelize = require("sequelize");

class History extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        rentalDate: { type: Sequelize.DATE, allowNull: false }, //빌린날짜
        returnDate: { type: Sequelize.DATE, allowNull: false }, //반납약속일
        price: { type: Sequelize.DOUBLE, allowNull: false }, //총 가격
        deposit: { type: Sequelize.DOUBLE, allowNull: false },
        state: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          validate: {
            min: 0,
            max: 6,
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "History", // 시퀄에서 사용되는 이름
        tableName: "historys", //db에 저장되는 이름
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }

  static associate(db) {
    db.History.belongsTo(db.User, {
      foreignKey: "ownerId",
      targetKey: "id",
    });
    db.History.belongsTo(db.User, {
      foreignKey: "lenderId",
      targetKey: "id",
    });

    db.History.belongsTo(db.Post);
  }
}

module.exports = History;
