const jwt = require("jsonwebtoken");
const { createEncryption, decryptionCode } = require("./formatter");

// 토큰 발급
exports.createToken = async (id) => {
  try {
    const data = await createEncryption();

    const refreshToken = await jwt.sign(
      {
        user_id: id,
        token_id: data,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        issuer: "Everyshare",
        subject: "refresh_token",
        expiresIn: "14d",
      },
    );

    const accessToken = await jwt.sign(
      {
        user_id: id,
      },
      process.env.JWT_SECRET,
      {
        issuer: "Everyshare",
        subject: "access_token",
        expiresIn: "10m",
      },
    );

    if (!refreshToken || !accessToken) {
      return;
    }

    return {
      refreshToken,
      accessToken,
    };
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createAccessToken = async (id) => {
  try {
    const accessToken = await jwt.sign(
      {
        user_id: id,
      },
      process.env.JWT_SECRET,
      {
        issuer: "Everyshare",
        subject: "access_token",
        expiresIn: "10m",
      },
    );

    if (!accessToken) {
      return;
    }

    return accessToken;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.decodeRefreshToken = async (refreshToken) => {
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );
    const result = await decryptionCode(decodedToken.token_id);
    if (!result) return;
    return decodedToken;
  } catch (error) {
    console.error(error);
  }
};

exports.decodeAccessToken = async (accessToken) => {
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decodedToken) return;
    return decodedToken;
  } catch (error) {
    console.error(error);
  }
};
