const jwt = require("jsonwebtoken");
const pool = require("../modules/db");

const calculateRating = (ratings) => {
	let total = 0;
	ratings.forEach((rating) => {
		const rate = parseFloat(rating.rating);
		total += rate;
	});
	const rating = total / ratings.length;
	return rating;
};

const calculateActivity = (requests, transactions) => {
	const total = requests.length + transactions.length;
	return total;
};

module.exports = {
	summary: async (req, res) => {
		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);

			const walletQuery = `SELECT * FROM wallets WHERE user_id = $1`;
			const walletValues = [user.user_id];
			const walletRes = await pool.query(walletQuery, walletValues);

			const ratingQuery = `SELECT * FROM user_ratings WHERE rated_user_id = $1`;
			const ratingValues = [user.user_id];
			const userRes = await pool.query(ratingQuery, ratingValues);

			const requestsQuery = `SELECT * FROM requests_history WHERE user_id = $1`;
			const requestsValues = [user.user_id];
			const requestsRes = await pool.query(requestsQuery, requestsValues);

			const transactionsQuery = `SELECT * FROM transactions_history WHERE user_id = $1`;
			const transactionsValues = [user.user_id];
			const transactionsRes = await pool.query(
				transactionsQuery,
				transactionsValues,
			);

			const rating = calculateRating(userRes.rows);

			const total = calculateActivity(requestsRes.rows, transactionsRes.rows);

			const recent_requests = requestsRes.rows.slice(0, 5);
			const recent_transactions = transactionsRes.rows.slice(0, 5);

			res.status(200).json({
				wallet: walletRes.rows[0],
				rating: rating,
				activity: total,
				recent_requests: recent_requests,
				recent_transactions: recent_transactions,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},
};
