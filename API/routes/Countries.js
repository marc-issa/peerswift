const express = require("express");
const router = express();

const CountriesController = require("../controllers/CountriesController");

router.get("/insert", CountriesController.insertCountries);
router.get("/id", CountriesController.getCountryById);
router.get("/", CountriesController.getCountries);

module.exports = router;
