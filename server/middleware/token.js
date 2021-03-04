const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { decodeAccessToken, decodeRefreshToken } = require("../utils/token");

// 액세스 토큰 확인
exports.verifyToken = async (req, res, next) => {
  console.log("토큰 확인 시작");
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("토큰 확인 완료");
    next();
  } catch (error) {
    return res.status(401).send("잘못된 토큰이거나 존재하지 않습니다.");
  }
};

exports.verifyLoginToken = async (req, res, next) => {
  try {
    const access = req.cookies.access_token || undefined;
    if (!access) {
      const decodedRefresh = await decodeRefreshToken(
        req.cookies.refresh_token,
      );
      if (decodedRefresh) {
        req.decoded = decodedRefresh;
        return res.status(401).send("토큰이 잘못되었거나 존재하지 않습니다.");
      }
    } else {
      const decodedAccess = await decodeAccessToken(access);
      req.decoded = decodedAccess;
      next();
    }
  } catch (error) {
    console.log("토큰 확인 에러");
    return res.status(401).send("토큰이 잘못되었거나 존재하지 않습니다.");
  }
};
