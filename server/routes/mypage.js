const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ctrl = require('../controller/mypage');
const { verifyToken, verifyToken } = require('../middleware/token');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('업로드 폴더가 없으므로 생성합니다');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'everyshare',
    key(req, file, cb) {
      cb(null, `profile/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.patch(
  '/info/profile',
  verifyToken,
  upload.single('profile'),
  ctrl.updateProfileRequest,
);

router.patch('/info', verifyToken, ctrl.updateNicknameRequest);

router.get('/contents', verifyToken, ctrl.loadContentsRequest);

router.get('/zzim', verifyToken, ctrl.loadZzimListRequest);

router.get('/owner', verifyToken, ctrl.loadMyOwnerItemRequest);

router.get('/rental', verifyToken, ctrl.loadMyRentalItemRequest);

module.exports = router;
