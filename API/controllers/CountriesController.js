const axios = require("axios");
const pool = require("../modules/db");

module.exports = {
	getCountryById: async (req, res) => {
		const id = req.query.id;
		const queryText = `SELECT * FROM countries WHERE id = $1`;
		try {
			const response = await pool.query(queryText, [id]);
			const country = response.rows[0];
			res.status(200).json({
				status: "success",
				data: country,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "Country not found",
			});
		}
	},
	insertCountries: async (req, res) => {
		const check_table = await pool.query("SELECT * FROM countries LIMIT 1");
		if (check_table.rows.length > 0) {
			return res.status(400).json({
				status: "error",
				message: "Countries already added",
			});
		}
		const url = "https://restcountries.com/v3.1/all";
		try {
			const response = await axios.get(url);
			const countries = response.data;
			const queryText = `INSERT INTO countries (code, name, currency_name, currency_code, flag, abreviation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

			for (const country of countries) {
				for (const currencyCode in country.currencies) {
					const currency = country.currencies[currencyCode];
					let phoneCode = `${country.idd.root}${country.idd.suffixes}`;
					if (phoneCode.length > 255) {
						phoneCode = "N/A";
					}
					const values = [
						phoneCode,
						country.name.common,
						currency.name,
						currencyCode,
						country.flags.png,
						country.cca3,
					];
					await pool.query(queryText, values);
				}
			}

			res.status(201).json({
				status: "success",
				message: "Countries added successfully",
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "Countries not added",
			});
		}
	},
	getCountries: async (req, res) => {
		const queryText = `SELECT * FROM countries ORDER BY name ASC`;
		try {
			const response = await pool.query(queryText);
			const countries = response.rows;
			res.status(200).json({
				status: "success",
				data: countries,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "Countries not found",
			});
		}
	},
};
