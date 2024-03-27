const express = require("express");
const router = express();

const GroupsController = require("../controllers/GroupsController");

router.get("/create", GroupsController.createGroup);

module.exports = router;
