const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  console.log("토큰 확인 시작");
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;

    return next();
  } catch (error) {
    return res.status(401).send("잘못된 토큰이거나 존재하지 않습니다.");
  }
};

const verifyLoginToken = async (req, res, next) => {
  try {
    const access = req.cookies.access_token || undefined;
    const refresh = req.cookies.refresh_token || undefined;

    if (!access && !refresh) {
      return res.status(401).send("토큰이 잘못되었거나 존재하지 않습니다.");
    }
    if (access) req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    else {
      req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch (error) {
    console.log("토큰 확인 에러");
    return res.status(401).send("토큰이 잘못되었거나 존재하지 않습니다.");
  }
};

module.exports = {
  verifyToken,
  verifyLoginToken,
};
