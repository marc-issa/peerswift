const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/dummy-login", AuthController.dummyLogin);
router.post("/verify-phone", AuthController.verifyPhone);
router.post("/signup", AuthController.signup);

router.use(auth.authenticateJWT);
router.post("/pin-access", AuthController.pinAccees);
router.post("/pin-insert", AuthController.pinInsert);

module.exports = router;
