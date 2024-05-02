const jwt = require("jsonwebtoken");
const pool = require("../modules/db");

module.exports = {
	getGroups: async (req, res) => {
		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const page = parseInt(req.query.page) || 1;
			const pageSize = 10;
			const offset = (page - 1) * pageSize;

			const countryQuery = `SELECT * FROM countries WHERE id = $1`;
			const messagesQuery = `SELECT * FROM group_messages WHERE group_id = $1 ORDER BY timestamp DESC`;

			const query = `SELECT * FROM user_group_memberships WHERE user_id = $1 LIMIT $2 OFFSET $3`;

			const result = await pool.query(query, [user.id, pageSize, offset]);

			for (let i = 0; i < result.rows.length; i++) {
				const groupQuery = `SELECT * FROM groups WHERE id = $1`;
				const groupResult = await pool.query(groupQuery, [
					result.rows[i].group_id,
				]);
				result.rows[i].group = groupResult.rows[0];

				const countryResult = await pool.query(countryQuery, [
					groupResult.rows[0].country_id,
				]);
				result.rows[i].country = countryResult.rows[0];

				const messagesResult = await pool.query(messagesQuery, [
					result.rows[i].group_id,
				]);
				for (let j = 0; j < messagesResult.rows.length; j++) {
					if (messagesResult.rows[j].user_id === user.id) {
						messagesResult.rows[j].incoming = false;
						messagesResult.rows[j].sender = user;
					} else {
						messagesResult.rows[j].incoming = true;
						const senderQuery = `SELECT * FROM users WHERE id = $1`;
						const senderResult = await pool.query(senderQuery, [
							messagesResult.rows[j].user_id,
						]);
						messagesResult.rows[j].sender = senderResult.rows[0];
					}
				}
				result.rows[i].messages = messagesResult.rows;
				result.rows[i].last_message = messagesResult.rows[0];
			}

			res.status(200).json({
				status: "success",
				data: result.rows,
			});
		} catch (error) {
			console.error("Error in getGroups:", error.stack);
			res.status(400).json({
				status: "error",
				message: error.message || "Unable to get groups",
			});
		}
	},
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
				const groupValues = [country.name, country.id];
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
	addToGroup: async (req, res) => {
		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const { country_id } = req.body;

			const checkGroup = `SELECT * FROM groups WHERE country_id = $1`;
			const checkResult = await pool.query(checkGroup, [country_id]);
			if (checkResult.rows.length === 0) {
				return res.status(404).json({
					status: "error",
					message: "Group not found",
				});
			}

			const query = `INSERT INTO user_group_memberships (user_id, group_id, join_date) VALUES ($1, $2, NOW()) RETURNING *`;
			const values = [user.id, checkResult.rows[0].id];
			const result = await pool.query(query, values);

			res.status(201).json({
				status: "success",
				message: "User added to group successfully",
				data: result.rows[0],
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "Unable to add user to group",
			});
		}
	},
	sendMessage: async (req, res) => {
		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const { group_id, message } = req.body;

			const insertMessageQuery = `INSERT INTO group_messages (group_id, user_id, message, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *`;
			const messageResult = await pool.query(insertMessageQuery, [
				group_id,
				user.id,
				message,
			]);
			const messageData = messageResult.rows[0];

			const groupQuery = `SELECT * FROM groups WHERE id = $1`;
			const groupResult = await pool.query(groupQuery, [group_id]);

			const countryQuery = `SELECT * FROM countries WHERE id = $1`;
			const countryResult = await pool.query(countryQuery, [
				groupResult.rows[0].country_id,
			]);

			if (messageData.user_id === user.id) {
				messageData.incoming = false;
				messageData.sender = user;
			} else {
				messageData.incoming = true;
				const senderQuery = `SELECT * FROM users WHERE id = $1`;
				const senderResult = await pool.query(senderQuery, [
					messageData.user_id,
				]);
				messageData.sender = senderResult.rows[0];
			}

			res.status(201).json({
				status: "success",
				data: {
					group: groupResult.rows[0],
					country: countryResult.rows[0],
					messages: messageData,
				},
			});
		} catch (error) {
			console.error("Error in sendMessage:", error.stack);
			res.status(400).json({
				status: "error",
				message: error.message || "Unable to send message",
			});
		}
	},
};
