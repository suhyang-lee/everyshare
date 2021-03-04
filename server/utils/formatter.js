/* 어디든 공통으로 사용할 수 있는 util 함수들 */
const bcrypt = require("bcrypt");

/* 날짜 포맷 */
exports.dateFormat = (key, values) => {
  var myDate = new Date(values[key]);
  values[key] = myDate.getTime();
  return values;
};

exports.dateFormats = (key, values) => {
  values = values.map((date) => {
    var myDate = new Date(date[key]);
    return (date[key] = myDate.getTime());
  });

  return values;
};

exports.dateDiff = (date1, date2) => {
  const sdt = new Date(date1);
  const edt = new Date(date2);
  const dateDiff = Math.ceil(
    (edt.getTime() - sdt.getTime()) / (1000 * 3600 * 24),
  );

  return dateDiff;
};

/* 밀리초 변환 */
exports.getMillisecondsOfDay = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date.setMilliseconds(date.getMilliseconds() + 10000);
};

exports.getMillisecondsOfMinutes = (minutes) => {
  var date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date.setMilliseconds(date.getMilliseconds());
};

/* 암호화 */

exports.createEncryption = async () => {
  try {
    return await bcrypt.hash(process.env.JWT_REFRESH_SECRET, 10);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.decryptionCode = async (value) => {
  try {
    return await bcrypt.compare(process.env.JWT_REFRESH_SECRET, value);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createTokenCookies = (accessToken, refreshToken) => {
  return {
    access: [
      "access_token",
      accessToken,
      {
        httpOnly: true,
        maxAge: 10 * 60,
      },
    ],
    refresh: [
      "refresh_token",
      refreshToken,
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 14,
      },
    ],
  };
};

exports.setCookieDays = (day) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + day);
  return expires;
};

exports.setCookieMinutes = (minutes) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + minutes);
  return expires;
};
