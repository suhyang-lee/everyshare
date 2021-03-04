const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_CLIENT_ID,
      },
      async (jwtPayload, done) => {
        try {
          const exUser = await User.findOne({
            where: { id: jwtPayload.email },
          });

          if (exUser) {
            return done(null, exUser, { message: "로그인이 완료되었습니다." });
          } else {
            return done(null, false, {
              message:
                "입력한 정보가 존재하지 않거나 입력한 비밀번호가 다릅니다.",
            });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
