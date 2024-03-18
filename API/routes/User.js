const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const UserController = require("../controllers/UserController");

router.use(auth.authenticateJWT);

router.get("/", UserController.get);

module.exports = router;