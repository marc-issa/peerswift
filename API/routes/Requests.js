const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const RequestsController = require("../controllers/RequestsController");

router.use(auth.authenticateJWT);

router.get("/", RequestsController.getRequests);
router.post("/send", RequestsController.sendRequest);
router.post("/cancel", RequestsController.cancelRequest);
router.post("/sent", RequestsController.confirmTransfer);
router.post("/received", RequestsController.confirmReceived);

module.exports = router;
