const UserService = require("../service/user");

const User = {
  loadUserRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;

      if (!req.cookies.refresh_token) {
        req.headers.authorization = null;
        return res.status(201).send("");
      }

      if (userId) {
        const user = await UserService.loadUserInfo(userId);
        res.status(200).json(user);
      } else {
        res.status(201).send("ok");
      }
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
        return res.status(403).send("이미 사용중인 아이디입니다.");
      }
      const result = UserService.addLocalUser(req.body);
      if (!result) return res.status(403).send("사용자 등록에 실패했습니다.");

      res.status(201).send("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  logoutRequest: async (req, res, next) => {
    try {
      return res
        .status(200)
        .clearCookie("refresh_token", { path: "/", domain: ".everyshare.shop" })
        .send("로그아웃 완료되었습니다.");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = User;
