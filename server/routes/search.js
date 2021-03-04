const express = require("express");
const ctrl = require("../controller/post");

const router = express.Router();

router.get("/:keyword", ctrl.loadSearchPostRequest);

module.exports = router;
