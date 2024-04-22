const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const TransactionsController = require("../controllers/TransactionsController");

router.use(auth.authenticateJWT);

router.get("/", TransactionsController.getTransactions);

module.exports = router;
