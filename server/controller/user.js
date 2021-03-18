const UserService = require('../service/user');
const { setCookieMinutes } = require('../utils/formatter');

const User = {
  loadUserRequest: async (req, res, next) => {
    try {
      if (!req.cookies.refresh_token) return res.status(201).send('');

      if (!req.decoded) return res.status(201).send('ok');

      const userId = req.decoded.user_id;

      const user = await UserService.loadUserInfo(userId);

      return res.status(200).json({ userInfo: user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addLocalUserRequest: async (req, res, next) => {
    try {
      const { userEmail } = req.body;
      const exUser = await UserService.verifyUserEmail(userEmail);

      if (exUser) {
        return res.status(403).send('이미 사용중인 아이디입니다.');
      }

      const result = UserService.addLocalUser(req.body);
      if (!result) return res.status(403).send('사용자 등록에 실패했습니다.');

      res.status(201).send('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  logoutRequest: async (req, res, next) => {
    try {
      return res
        .status(200)
        .clearCookie('refresh_token', {
          path: '/',
          domain:
            process.env.NODE_ENV === 'production'
              ? '.everyshare.shop'
              : 'localhost',
        })
        .clearCookie('access_token', {
          path: '/',
          domain:
            process.env.NODE_ENV === 'production'
              ? '.everyshare.shop'
              : 'localhost',
        })
        .send('ok');
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  signoutRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      UserService.removeUser(userId);
      return res
        .status(200)
        .clearCookie('refresh_token', {
          path: '/',
          domain:
            process.env.NODE_ENV === 'production'
              ? '.everyshare.shop'
              : 'localhost',
        })
        .send('회원탈퇴 완료되었습니다.');
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = User;
