const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const RequestsController = require("../controllers/RequestsController");

router.use(auth.authenticateJWT);

router.get("/", RequestsController.getRequests);

module.exports = router;
