const Sequelize = require("sequelize");

const User = require("./user");
const Comment = require("./comment");
const Image = require("./image");
const Post = require("./post");
const History = require("./history");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.User = User;
db.Comment = Comment;
db.Image = Image;
db.Post = Post;
db.History = History;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
