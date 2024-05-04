const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const SendController = require("../controllers/SendController");

router.use(auth.authenticateJWT);

router.get("/", SendController.sendSummary);
router.post("/transfer", SendController.sendMoney);

module.exports = router;
