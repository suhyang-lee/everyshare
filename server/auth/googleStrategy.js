const passport = require("passport");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { email: profile.emails[0].value },
          });

          if (exUser) {
            return done(null, exUser, {
              message: "존재하는 이메일 입니다.",
            });
          }

          const hashPassword = await bcrypt.hash(profile.id, 10);
          const newUser = await User.create({
            email: profile.emails[0].value,
            password: hashPassword,
            nickname: profile.displayName,
            phonenumber: 0,
            provider: profile.provider,
          });

          return done(null, newUser);
        } catch (err) {
          return done(err, false, { message: "구글 로그인에 실패하였습니다." });
        }
      },
    ),
  );
};
