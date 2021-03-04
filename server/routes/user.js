const express = require("express");
const { verifyToken } = require("../middleware/token");
const ctrl = require("../controller/user");

const router = express.Router();

router.get("/", verifyToken, ctrl.loadUserRequest);

router.post("/", ctrl.addLocalUserRequest);

router.post("/logout", ctrl.logoutRequest);

module.exports = router;
