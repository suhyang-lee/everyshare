const { Post, User, Image } = require("../models");
const bcrypt = require("bcrypt");

const UserService = {
  verifyUserEmail: async (email) => {
    try {
      const exUser = await User.findOne({
        where: { email: email },
      });

      return exUser;
    } catch (error) {
      console.error(error);
    }
  },

  verifyUserInfo: async (value) => {
    try {
      const exUser = await User.findOne({
        where: value,
      });

      return exUser;
    } catch (error) {
      console.error(error);
    }
  },

  loadUserInfo: async (id) => {
    try {
      const userInfo = await User.findOne({
        where: { id: id },
        attributes: ["id", "email", "nickname", "profileUrl"],
        include: [
          {
            model: Post,
            as: "Zzimed",
            attributes: ["id"],
          },
        ],
      });

      return userInfo;
    } catch (error) {
      console.error(error);
    }
  },

  addSNSUserInfo: async (data) => {
    try {
      const { id, email, nickname, phonenumber, profileUrl, provider } = data;

      const exUser = await UserService.verifyUserEmail(email);

      if (exUser) return exUser;

      const hashPassword = await bcrypt.hash(String(id), 10);
      const newUser = await User.create({
        email: email,
        password: hashPassword,
        nickname: nickname,
        phonenumber: phonenumber,
        profileUrl: profileUrl,
        provider: provider,
      });

      return newUser;
    } catch (error) {
      console.error(error);
    }
  },

  addLocalUser: async (data) => {
    try {
      const {
        userEmail,
        userNickname,
        userPassword,
        userPhoneNumber,
        provider,
      } = data;

      const exUser = await UserService.verifyUserEmail(userEmail);

      if (exUser) return exUser;

      const hashPassword = await bcrypt.hash(userPassword, 10);

      const result = await User.create({
        email: userEmail,
        password: hashPassword,
        nickname: userNickname,
        phonenumber: userPhoneNumber,
        provider: provider,
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserService;
