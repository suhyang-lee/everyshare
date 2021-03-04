const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ctrl = require("../controller/mypage");
const { verifyToken } = require("../middleware/token");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("업로드 폴더가 없으므로 생성합니다");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.patch(
  "/info/profile",
  verifyToken,
  upload.single("profile"),
  ctrl.updateProfileRequest,
);

router.patch("/info", verifyToken, ctrl.updateNicknameRequest);

router.get("/contents", verifyToken, ctrl.loadCommentsRequest);

router.get("/zzim", verifyToken, ctrl.loadZzimListRequest);

router.get("/owner", verifyToken, ctrl.loadMyOwnerItemRequest);

router.get("/rental", verifyToken, ctrl.loadMyRentalItemRequest);

module.exports = router;
