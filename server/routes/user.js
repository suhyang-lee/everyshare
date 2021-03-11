const express = require("express");
const { verifyToken, verifyLoginToken } = require("../middleware/token");
const ctrl = require("../controller/user");

const router = express.Router();

router.get("/", verifyToken, ctrl.loadUserRequest);

router.post("/", ctrl.addLocalUserRequest);

router.post("/logout", verifyToken, ctrl.logoutRequest);

router.delete("/signout", verifyToken, ctrl.signoutRequest);

module.exports = router;
