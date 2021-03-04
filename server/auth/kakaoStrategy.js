const passport = require("passport");
const UserService = require("../service/user");

const KakaoStrategy = require("passport-kakao").Strategy;

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/auth/kakao/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { kakao_account, id, properties } = profile._json;

          const exUser = await UserService.verifyUserEmail(kakao_account.email);

          if (exUser) {
            return done(null, exUser, {
              message: "존재하는 이메일 입니다.",
            });
          }

          const newUser = await UserService.addSNSUserInfo({
            id: id,
            email: kakao_account.email,
            nickname: kakao_account.profile.nickname,
            phonenumber: id,
            profileUrl: properties.thumbnail_image,
            provider: profile.provider,
          });

          return done(null, newUser);
        } catch (err) {
          return done(err, false, {
            message: "카카오 로그인에 실패하였습니다.",
          });
        }
      },
    ),
  );
};
