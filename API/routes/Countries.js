const express = require("express");
const router = express();

const CountriesController = require("../controllers/CountriesController");

router.get("/insert", CountriesController.insertCountries);

module.exports = router;
