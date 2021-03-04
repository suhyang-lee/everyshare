const passport = require("passport");
const UserService = require("../service/user");

const NaverStrategy = require("passport-naver").Strategy;

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: "/auth/naver/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { provider, id, displayName, emails, _json } = profile;

          const exUser = await UserService.verifyUserEmail(emails[0].value);

          if (exUser) {
            return done(null, exUser, {
              message: "존재하는 이메일 입니다.",
            });
          }

          const newUser = await UserService.addSNSUserInfo({
            id: id,
            email: emails[0].value,
            nickname: displayName,
            phonenumber: 000000,
            profileUrl: _json.profile_image,
            provider: provider,
          });

          return done(null, newUser);
        } catch (err) {
          return done(err, false, { message: "구글 로그인에 실패하였습니다." });
        }
      },
    ),
  );
};
