const jwt = require("jsonwebtoken");
const pool = require("../modules/db");
module.exports = {
	summary: async (req, res) => {
		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const query = `SELECT * FROM users where id = $1 JOIN wallets ON users.user_id = wallets.user_id JOIN transaction_histories ON users.user_id = transaction_histories.user_id JOIN request_histories ON users.user_id = request_histories.user_id JOIN user_ratings ON users.user_id = user_ratings.user_id`;
			const values = [user.id];
			await pool.query(query, values, (error, results) => {
				if (error) {
					res.status(400).json({
						status: "error",
						message: error.message || "User not found",
					});
				}
				res.status(200).json({
					status: "success",
					message: "User summary",
					data: results.rows,
				});
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},
};
