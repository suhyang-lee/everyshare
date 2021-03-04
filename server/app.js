const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const hpp = require("hpp");
const helmet = require("helmet");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const searchRouter = require("./routes/search");
const mypageRouter = require("./routes/mypage");

const db = require("./models");
const passportConfig = require("./auth");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:3000", "http://52.79.113.249"],
    credentials: true,
  }),
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/search", searchRouter);
app.use("/mypage", mypageRouter);

// 에러처리 미들웨어 작성법
// app.use((err, req, res, next) => {
// });

app.listen(process.env.PORT || 3060, () => {
  console.log("서버 실행 중!");
});
