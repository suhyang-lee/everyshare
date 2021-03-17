const express = require("express");
const passport = require("passport");
const ctrl = require("../controller/auth");

const router = express.Router();

router.get("/google", ctrl.googleLogin);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  ctrl.callLogin,
);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    session: false,
  }),
  ctrl.callSnsLogin,
);

router.get("/naver", passport.authenticate("naver"));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    session: false,
  }),
  ctrl.callSnsLogin,
);

router.post("/user", ctrl.loadUser);

router.post("/local", ctrl.callLogin);

router.post("/token", ctrl.issueToken);

module.exports = router;
