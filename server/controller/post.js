const PostService = require("../service/post");

const { dateDiff } = require("../utils/formatter");

const Post = {
  addImagePostRequest: (req, res, next) => {
    const data = [];
    req.files.map((image) => data.push({ src: image.filename }));
    res.json(data);
  },

  removeImagePostRequest: async (req, res, next) => {
    try {
      const id = req.query.id;
      await PostService.removeImagePost(id);
      res.status(200).json({ id: id, message: "삭제가 완료되었습니다" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addPostRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      const { Images } = req.body;

      const post = await PostService.addPost(userId, req.body);
      if (Images) await PostService.addImage(post.id, Images);

      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadAllPostsRequest: async (req, res, next) => {
    try {
      const where = {};
      if (parseInt(req.query.lastId, 10)) {
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      }

      where.category = decodeURIComponent(req.params.category);

      const posts = await PostService.loadAllPosts(where);

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadPostRequest: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const exPost = await PostService.loadPost(id);

      if (!exPost) return res.status(403).send("존재하지 않는 게시글입니다.");

      res.status(201).json(exPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updatePostRequest: async (req, res, next) => {
    try {
      const postId = req.params.id;
      const { Images } = req.body.data;

      await PostService.updatePost(postId, req.body.data);

      if (Images) await PostService.addImage(postId, Images);

      const exPost = await PostService.loadPost(postId);

      res.status(200).json(exPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  removePostRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      const postId = parseInt(req.params.id, 10);

      await PostService.removePost(userId, postId);

      res.status(200).send("게시물이 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addCommentRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      const postId = parseInt(req.params.id, 10);

      const exPost = await PostService.verifyPost(postId);

      if (!exPost) return res.status(403).send("존재하지 않는 게시글입니다.");

      const comment = await PostService.addComment(postId, userId);
      const newComment = await PostService.loadComment(comment.id);

      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  removeCommentRequest: async (req, res, next) => {
    try {
      // 1. 댓글 번호 가져오기
      // 2. 댓글 번호로 찾아 -> 작성자와 요청보낸 사용자가 동일하면 삭제

      res.status(201).json("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addZzimListRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      const postId = parseInt(req.params.id, 10);

      const exPost = await PostService.verifyPost(postId);

      if (!exPost) return res.status(403).send("상품이 존재하지 않습니다.");

      await PostService.addZzimList(userId, exPost);

      res.status(200).json({ PostId: exPost.id, UserId: userId });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  removeZzimListRequest: async (req, res, next) => {
    try {
      const userId = req.decoded.user_id;
      const postId = parseInt(req.params.id, 10);

      const exPost = await PostService.verifyPost(postId);

      if (!exPost) return res.status(403).send("상품이 존재하지 않습니다.");

      await PostService.removeZzimList(postId);

      res.json({ PostId: exPost.id, UserId: userId });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addApplyRequest: async (req, res, next) => {
    try {
      const { rentalDate, returnDate } = req.body;

      const diff = dateDiff(rentalDate, returnDate);
      await PostService.addApply(req.body, diff);

      res.status(200).send("신청이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  loadSearchPostRequest: async (req, res, next) => {
    try {
      const keyword = decodeURIComponent(req.params.keyword);
      const searchList = await PostService.loadSearchPost(keyword);

      res.status(200).json(searchList);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = Post;
