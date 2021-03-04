const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ctrl = require("../controller/post");
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

router.post(
  "/images",
  verifyToken,
  upload.array("image"),
  ctrl.addImagePostRequest,
);
router.delete("/images", verifyToken, ctrl.removeImagePostRequest);

router.post("/", verifyToken, ctrl.addPostRequest);
router.get("/:id", ctrl.loadPostRequest);
router.patch("/:id", verifyToken, ctrl.updatePostRequest);
router.delete("/:id", verifyToken, ctrl.removePostRequest);

router.post("/:id/comment", verifyToken, ctrl.addCommentRequest);
router.delete("/:id/comment", verifyToken, ctrl.removeCommentRequest);

router.patch("/:id/zzim", verifyToken, ctrl.addZzimListRequest);
router.delete("/:id/zzim", verifyToken, ctrl.removeZzimListRequest);

router.post("/apply", verifyToken, ctrl.addApplyRequest);

module.exports = router;
