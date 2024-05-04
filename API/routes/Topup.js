const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const TopupController = require("../controllers/TopupController");

router.use(auth.authenticateJWT);

router.post("/", TopupController.deposit);

module.exports = router;
