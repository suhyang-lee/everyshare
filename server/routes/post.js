const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const ctrl = require('../controller/post');
const { verifyToken, verifyLoginToken } = require('../middleware/token');

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
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post(
  '/images',
  verifyLoginToken,
  upload.array('image'),
  ctrl.addImagePostRequest,
);
router.delete('/images', verifyLoginToken, ctrl.removeImagePostRequest);

router.post('/', verifyLoginToken, ctrl.addPostRequest);
router.get('/:id', ctrl.loadPostRequest);
router.patch('/:id', verifyLoginToken, ctrl.updatePostRequest);
router.delete('/:id', verifyLoginToken, ctrl.removePostRequest);

router.post('/:id/comment', verifyLoginToken, ctrl.addCommentRequest);
router.patch('/comment/:id', verifyLoginToken, ctrl.updateCommentRequest);
router.delete('/comment/:id', verifyLoginToken, ctrl.removeCommentRequest);

router.patch('/:id/zzim', verifyLoginToken, ctrl.addZzimListRequest);
router.delete('/:id/zzim', verifyLoginToken, ctrl.removeZzimListRequest);

router.post('/apply', verifyLoginToken, ctrl.addApplyRequest);

module.exports = router;
