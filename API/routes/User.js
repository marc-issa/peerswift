const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const UserController = require("../controllers/UserController");

router.use(auth.authenticateJWT);

router.get("/summary", UserController.summary);
router.post("/get", UserController.getUser);
router.post("/contact/add", UserController.addContact);

module.exports = router;
