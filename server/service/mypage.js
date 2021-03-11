const { Post, User, Comment, History, Image } = require("../models");

const MyageService = {
  loadComments: async (id, pageNum) => {
    try {
      let offset = 0;
      if (pageNum > 1) offset = 5 * (pageNum - 1);

      const result = await Comment.findAndCountAll({
        where: { postId: id },
        offset,
        limit: 5,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "contents", "createdAt"],
        raw: true,
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadPost: async (id, pageNum) => {
    try {
      let offset = 0;
      if (pageNum > 1) offset = 5 * (pageNum - 1);

      const result = await Post.findAndCountAll({
        where: { userId: id },
        offset,
        limit: 5,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "createdAt"],
        raw: true,
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateProfile: async (id, data) => {
    try {
      await User.update({ profileUrl: data }, { where: { id: id } });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateNickname: async (id, data) => {
    try {
      await User.update({ nickname: data }, { where: { id: id } });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadZzimList: async (id) => {
    try {
      const result = await User.findOne({
        where: { id: id },
        attributes: [],
        include: [
          {
            model: Post,
            as: "Zzimed",
            attributes: ["id", "title"],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadMyOwnerItem: async (id) => {
    try {
      const result = await History.findAll({
        where: { ownerId: id },
        attributes: [
          "id",
          "rentalDate",
          "returnDate",
          "price",
          "deposit",
          "state",
          "PostId",
        ],
        include: [
          {
            model: Post,
            attributes: ["title"],
            include: [{ model: Image }],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadMyRentalItem: async (id) => {
    try {
      const result = await History.findAll({
        where: { lenderId: id },
        attributes: [
          "id",
          "rentalDate",
          "returnDate",
          "price",
          "deposit",
          "state",
          "PostId",
        ],
        include: [
          {
            model: Post,
            attributes: ["title"],
            include: [{ model: Image }],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = MyageService;
