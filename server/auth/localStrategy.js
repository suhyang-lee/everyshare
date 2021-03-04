const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({
            where: { email },
          });

          if (!exUser) {
            return done(null, false, {
              message: "아이디나 비밀번호를 확인 해 주세요.",
            });
          }

          const result = await bcrypt.compare(password, exUser.password);
          if (!result) {
            return done(null, false, {
              message: "아이디나 비밀번호를 확인 해 주세요.",
            });
          }

          return done(null, exUser);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
