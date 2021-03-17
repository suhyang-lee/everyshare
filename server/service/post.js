const { Post, Image, User, Comment, History } = require('../models');
const { Op } = require('sequelize');

const PostService = {
  removeImagePost: async (id) => {
    try {
      await Image.destroy({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
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
    }
  },

  verifyPost: async (id) => {
    try {
      const result = await Post.findByPk(id);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  loadAllPosts: async (where) => {
    try {
      const result = await Post.findAll({
        where,
        limit: 10,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'postType', 'price', 'deposit'],
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
    }
  },

  loadPost: async (id) => {
    try {
      const result = await Post.findOne({
        where: { id: id },
        include: [
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'email', 'nickname', 'profileUrl'],
              },
            ],
          },
          {
            model: User,
            attributes: ['id', 'nickname', 'email', 'profileUrl'],
          },
          {
            model: User,
            as: 'Basketer',
            attributes: ['id'],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
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
    }
  },

  removePost: async (userId, postId) => {
    try {
      await Post.destroy({
        where: { id: postId, UserId: userId },
      });
    } catch (error) {
      console.error(error);
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
    }
  },

  updateComment: async (commentId, data) => {
    try {
      await Comment.update(
        {
          contents: data,
        },
        { where: { id: commentId } },
      );

      const result = Comment.findByPk(commentId);

      return result;
    } catch (error) {
      console.error(error);
    }
  },

  removeComment: async (commentId) => {
    try {
      await Comment.destroy({
        where: { id: commentId },
      });
    } catch (error) {
      console.error(error);
    }
  },

  loadComment: async (id) => {
    try {
      const result = Comment.findOne({
        where: { id: id },
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'email', 'profileUrl'],
          },
        ],
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  },

  addZzimList: async (id, data) => {
    try {
      const result = await data.addBasketer(id);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  },

  removeZzimList: async (id, data) => {
    try {
      const result = await data.removeBasketer(id);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  },

  updatePostFlag: async (id) => {
    try {
      await Post.update(
        {
          flag: true,
        },
        { where: { id: id } },
      );
    } catch (error) {
      console.error(error);
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

      await PostService.updatePostFlag(PostId);

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
    }
  },

  loadSearchPost: async (keyword) => {
    try {
      const result = await Post.findAll({
        where: {
          title: { [Op.like]: `%${keyword}%` },
        },
        limit: 8,
        order: [['createdAt', 'DESC']],
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
    }
  },
};

module.exports = PostService;
