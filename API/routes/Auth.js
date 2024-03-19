const express = require("express");
const router = express();

const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
// router.post("/signup", AuthController.signup);
// router.post("/logout", AuthController.logout);
// router.post("/forgot-password", AuthController.forgotPassword);
// router.post("/reset-password", AuthController.resetPassword);
router.post("/verify-phone", AuthController.verifyPhone);
// router.post("/change-phone", AuthController.changePhone);

module.exports = router;
