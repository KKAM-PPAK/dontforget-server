const express = require("express");

const decodeToken = require("../utils/decodeToken");
const checkHeader = require("../utils/checkHeader");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/user", checkHeader, userController.getUser);
router.post("/signIn", decodeToken, userController.signIn);

module.exports = router;
