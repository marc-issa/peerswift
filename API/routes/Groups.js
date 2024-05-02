const auth = require("../middlewares/Auth");

const express = require("express");
const router = express();

const GroupsController = require("../controllers/GroupsController");

router.get("/", GroupsController.getGroups);
router.get("/create", GroupsController.createGroup);
router.post("/country", GroupsController.getGroupByCountry);

router.use(auth.authenticateJWT);
router.post("/add", GroupsController.addToGroup);
router.post("/messages/send", GroupsController.sendMessage);

module.exports = router;
