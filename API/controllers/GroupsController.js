const pool = require("../modules/db");
module.exports = {
	createGroup: async (req, res) => {
		try {
			const checkQuery = `SELECT * FROM groups`;
			const checkResult = await pool.query(checkQuery);
			if (checkResult.rows.length > 0) {
				return res.status(400).json({
					status: "error",
					message: "Groups already exist",
				});
			}
			const countriesQuery = `SELECT * FROM countries`;
			const countriesResult = await pool.query(countriesQuery);
			const countries = countriesResult.rows;

			const insertPromises = countries.map(async (country) => {
				const groupsQuery = `INSERT INTO groups (name, country_id) VALUES ($1, $2) RETURNING *`;
				const groupValues = [country.country_name, country.country_id];
				return await pool.query(groupsQuery, groupValues);
			});
			const responses = await Promise.all(insertPromises);

			res.status(201).json({
				status: "success",
				message: "Groups created successfully",
				data: responses.map((response) => response.rows),
			});
		} catch (error) {
			console.error("Error in createGroup:", error.stack);
			res.status(400).json({
				status: "error",
				message: error.message || "Unable to create groups",
			});
		}
	},
	getGroupByCountry: async (req, res) => {
		try {
			const { country_id } = req.body;
			const query = `SELECT * FROM groups WHERE country_id = $1`;
			const values = [country_id];
			const result = await pool.query(query, values);
			if (result.rows.length === 0) {
				return res.status(404).json({
					status: "error",
					message: "Group not found",
				});
			}
			res.status(200).json({
				status: "success",
				data: result.rows,
			});
		} catch (error) {
			console.error("Error in getGroupByCountry:", error.stack);
			res.status(400).json({
				status: "error",
				message: error.message || "Unable to get groups",
			});
		}
	},
};
