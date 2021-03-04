const passport = require("passport");
const jwt = require("jsonwebtoken");

const UserService = require("../service/user");

const { signToken, signRefrashToken } = require("../middleware/token");
const { createToken } = require("../utils/token");
const { setCookieDays } = require("../utils/formatter");

const Auth = {
  googleLogin: async (req, res, next) => {
    passport.authenticate("google", { scope: ["email", "profile"] });
  },

  callGoogle: async (req, res) => {
    try {
      const userInfo = req.user;

      const accessToken = await signToken(userInfo);
      const refreshToken = await signRefrashToken("issue", userInfo);

      if (!accessToken || !refreshToken) {
        return res.status(401).json(post);
      } else {
        return res.status(200).json({
          message: "토큰이 발급되었습니다.",
          accessToken,
          refreshToken,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  passCallback: async (req, res, next) => {
    try {
      if (req.query.redirect_url)
        req.session["redirect"] = decodeURIComponent(req.query.redirect_url);
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  callSnsLogin: async (req, res, next) => {
    try {
      const { id } = req.user;
      const redirect = decodeURIComponent(req.session.redirect);
      console.log(redirect);
      const token = await createToken(id);

      console.log("login ing....");

      if (!token.accessToken || !token.refreshToken)
        return res.status(403).send("토큰 발급에 실패하였습니다.");

      const userInfo = await UserService.loadUserInfo(id);

      if (!userInfo)
        return res.status(400).send("요청 된 정보가 존재하지 않습니다.");

      const dayExpires = setCookieDays(14);

      res.status(200).cookie("refresh_token", token.refreshToken, {
        httpOnly: true,
        expires: dayExpires,
        domain: process.env.NODE_ENV === "production" && ".everyshare.shop",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  callLogin: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || info || !user) return res.status(403).send(info.message);
      req.login(user, async (error) => {
        if (error) next(error);
        const { id } = user;
        const token = await createToken(id);

        if (!token.accessToken || !token.refreshToken)
          return res.status(403).send("토큰 발급에 실패하였습니다.");

        const userInfo = await UserService.loadUserInfo(id);

        if (!userInfo) {
          return res.status(400).send("요청 된 정보가 존재하지 않습니다.");
        }

        const dayExpires = setCookieDays(14);

        res
          .status(200)
          .cookie("refresh_token", token.refreshToken, {
            httpOnly: true,
            expires: dayExpires,
            domain: process.env.NODE_ENV === "production" && ".everyshare.shop",
          })
          .json({
            userInfo,
            accessToken: token.accessToken,
          });
      });
    })(req, res, next);
  },

  issueToken: async (req, res, next) => {
    try {
      const refresh = req.cookies.refresh_token || undefined;

      if (!refresh) return res.send("토큰이 존재하지 않습니다.");

      const decode = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
      const result = await UserService.verifyUserInfo({ id: decode.user_id });

      if (!result) return res.send("존재하지않는 유저 입니다.");
      const token = await createToken(decode.user_id);

      res.status(200).json({
        accessToken: token.accessToken,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = Auth;
