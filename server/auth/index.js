const passport = require("passport");
const local = require("./localStrategy");
const jwt = require("./jwtStrategy");
const google = require("./googleStrategy");
const kakao = require("./kakaoStrategy");
const naver = require("./naverStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  local();
  jwt();
  google();
  kakao();
  naver();
};
