const express = require("express");
const router = express();

const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/verify-phone", AuthController.verifyPhone);
router.post("/signup", AuthController.signup);
router.post("/pin-access", AuthController.pinAccees);

module.exports = router;
