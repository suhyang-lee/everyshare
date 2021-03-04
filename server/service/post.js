const { Post, Image, User, Comment, History } = require("../models");
const { Op } = require("sequelize");

const PostService = {
  removeImagePost: async (id) => {
    try {
      await Image.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addPost: async (id, data) => {
    try {
      const {
        postType,
        category,
        rentTerm,
        title,
        contents,
        rentelFeeSelect,
        rentalFee,
        deposit,
      } = data;

      const result = await Post.create({
        postType: postType,
        category: category,
        rentTerm: rentTerm,
        title: title,
        contents: contents,
        priceType: rentelFeeSelect,
        price: rentalFee,
        deposit: deposit,
        UserId: id,
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addImage: async (id, data) => {
    try {
      if (Array.isArray(data)) {
        await Promise.all(
          data.map((image) => {
            Image.create({
              src: image.src,
              PostId: id,
            });
          }),
        );
      } else {
        await Image.create({
          src: data.src,
          PostId: id,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  verifyPost: async (id) => {
    try {
      const result = await Post.findByPk(id);
      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadAllPosts: async (where) => {
    try {
      const result = await Post.findAll({
        where,
        limit: 10,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "postType", "price", "deposit"],
        include: [
          {
            model: Image,
            limit: 1,
          },
        ],
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadPost: async (id) => {
    try {
      const result = await Post.findOne({
        where: { id: id },
        order: [[Comment, "createdAt", "DESC"]],
        include: [
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "email", "nickname", "profileUrl"],
              },
            ],
          },
          {
            model: User,
            attributes: ["id", "nickname", "email", "profileUrl"],
          },
          {
            model: User,
            as: "Basketer",
            attributes: ["id"],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updatePost: async (id, data) => {
    try {
      const {
        postType,
        category,
        rentTerm,
        title,
        contents,
        rentelFeeSelect,
        rentalFee,
        deposit,
      } = data;

      await Post.update(
        {
          postType: postType,
          category: category,
          rentTerm: rentTerm,
          title: title,
          contents: contents,
          priceType: rentelFeeSelect,
          price: rentalFee,
          deposit: deposit,
        },
        { where: { id: id } },
      );
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  removePost: async (userId, postId) => {
    try {
      await Post.destroy({
        where: { id: postId, UserId: userId },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addComment: async (postId, userId, comment) => {
    try {
      const result = await Comment.create({
        contents: comment,
        PostId: postId,
        UserId: userId,
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadComment: async (id) => {
    try {
      const result = Comment.findOne({
        where: { id: id },
        include: [
          {
            model: User,
            attributes: ["id", "nickname", "email", "profileUrl"],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addZzimList: async (id, data) => {
    try {
      await data.addBasketer(id);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  removeZzimList: async (id, data) => {
    try {
      await data.removeBasketer(id);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addApply: async (data, diff) => {
    try {
      const {
        rentalDate,
        returnDate,
        price,
        deposit,
        ownerId,
        lenderId,
        PostId,
      } = data;

      await History.create({
        rentalDate,
        returnDate,
        price: price * diff,
        deposit,
        ownerId,
        lenderId,
        PostId,
        state: 0,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadSearchPost: async (keyword) => {
    try {
      const result = await Post.findAll({
        where: {
          title: { [Op.like]: `%${keyword}%` },
        },
        limit: 10,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Image,
            limit: 1,
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

module.exports = PostService;
