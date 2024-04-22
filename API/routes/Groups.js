const express = require("express");
const router = express();

const GroupsController = require("../controllers/GroupsController");

router.get("/", GroupsController.getGroups);
router.get("/create", GroupsController.createGroup);
router.post("/country", GroupsController.getGroupByCountry);

module.exports = router;
