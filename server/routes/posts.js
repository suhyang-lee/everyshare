const express = require("express");

const ctrl = require("../controller/post");

const router = express.Router();

router.get("/:category", ctrl.loadAllPostsRequest);

module.exports = router;
