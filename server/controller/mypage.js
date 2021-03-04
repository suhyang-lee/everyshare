const mypageService = require("../service/mypage");
const UserService = require("../service/user");

const Mypage = {
  loadCommentsRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      const pageNum = parseInt(req.query.pageNum);
      const type = req.query.type;

      let contents;

      if (type === "comments") {
        contents = await mypageService.loadComments(userId, pageNum);
      } else {
        contents = await mypageService.loadPost(userId, pageNum);
      }

      res.status(200).json({ count: contents.count, data: contents.rows });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateProfileRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;

      await mypageService.updateProfile(userId, req.file.filename);

      const user = await UserService.getUserInfo(userId);

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateNicknameRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;

      await mypageService.updateNickname(userId, req.body.nickname);

      const user = await UserService.getUserInfo(userId);

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadZzimListRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;

      const zzimList = await mypageService.loadZzimList(userId);

      res.status(200).json(zzimList.Zzimed);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadMyOwnerItemRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;

      const history = await mypageService.loadMyOwnerItem(userId);

      if (!history)
        return res.status(200).send("요청된 정보를 찾을 수 없습니다.");

      res.status(200).json(history);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadMyRentalItemRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;

      const history = await mypageService.loadMyRentalItem(userId);

      if (!history)
        return res.status(200).send("요청된 정보를 찾을 수 없습니다.");

      res.status(200).json(history);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = Mypage;
