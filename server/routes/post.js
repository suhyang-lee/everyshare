const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const ctrl = require('../controller/post');
const { verifyToken } = require('../middleware/token');

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
  verifyToken,
  upload.array('image'),
  ctrl.addImagePostRequest,
);
router.delete('/images', verifyToken, ctrl.removeImagePostRequest);

router.post('/', verifyToken, ctrl.addPostRequest);
router.get('/:id', ctrl.loadPostRequest);
router.patch('/:id', verifyToken, ctrl.updatePostRequest);
router.delete('/:id', verifyToken, ctrl.removePostRequest);

router.post('/:id/comment', verifyToken, ctrl.addCommentRequest);
router.patch('/comment/:id', verifyToken, ctrl.updateCommentRequest);
router.delete('/comment/:id', verifyToken, ctrl.removeCommentRequest);

router.patch('/:id/zzim', verifyToken, ctrl.addZzimListRequest);
router.delete('/:id/zzim', verifyToken, ctrl.removeZzimListRequest);

router.post('/apply', verifyToken, ctrl.addApplyRequest);

module.exports = router;
