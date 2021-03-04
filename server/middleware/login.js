const { setCookieMinutes, setCookieDays } = require("../utils/formatter");
const {
  decodeAccessToken,
  decodeRefreshToken,
  createToken,
} = require("../utils/token");

exports.isLoggedIn = async (req, res, next) => {
  const access = req.cookies.access_token || undefined;
  const refresh = req.cookies.refresh_token || undefined;

  //case1 : 모든 token이 존재하지 않는 경우
  if (!access && !refresh) {
    res.status(403).redirect("http://localhost:3000/login");
  }

  try {
    const refreshToken = await decodeRefreshToken(refresh);

    const token = await createToken(refreshToken.user_id);

    if (!token) res.status(401).send("잘못된 토큰입니다.");

    const minuteExpires = setCookieMinutes(10);
    const dayExpires = setCookieDays(14);

    res.cookie("access_token", token.accessToken, {
      httpOnly: true,
      expires: minuteExpires,
    });
    res.cookie("refresh_token", token.refreshToken, {
      httpOnly: true,
      expires: dayExpires,
    });
    return next();
  } catch (error) {
    console.error(error);
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  const access = req.cookies.access_token || undefined;
  const refresh = req.cookies.refresh_token || undefined;

  if (!access && !refresh) {
    next();
  } else {
    res.status(401).send("로그인 된 사용자는 접근이 불가합니다.");
  }
};
