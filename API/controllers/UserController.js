const jwt = require("jsonwebtoken");
const pool = require("../modules/db");

const calculateRating = (ratings) => {
	let total = 0;
	ratings.forEach((rating) => {
		total += rating.rating;
	});
	const rating = total / ratings.length;

	last_total = 0;
	ratings.forEach((rating) => {
		if (rating.rating_date < new Date().setDate(new Date().getDate() - 30)) {
			last_total += rating.rating;
		}
	});

	const last_rating = last_total / ratings.length;

	return { rating, last_rating };
};

const calculateActivity = (requests, transactions) => {
	const total = requests.length + transactions.length;
	let last_total = 0;
	requests.forEach((request) => {
		if (request.request_date < new Date().setDate(new Date().getDate() - 30)) {
			last_total += 1;
		}
	});
	transactions.forEach((transaction) => {
		if (
			transaction.transaction_date <
			new Date().setDate(new Date().getDate() - 30)
		) {
			last_total += 1;
		}
	});

	return { total, last_total };
};

const ratingChangePercentage = (rating, last_rating) => {
	return ((rating - last_rating) / last_rating) * 100;
};

const activityChangePercentage = (total, last_total) => {
	return ((total - last_total) / last_total) * 100;
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

			const requestsQuery = `SELECT * FROM request_histories WHERE user_id = $1`;
			const requestsValues = [user.user_id];
			const requestsRes = await pool.query(requestsQuery, requestsValues);

			const transactionsQuery = `SELECT * FROM transaction_histories WHERE user_id = $1`;
			const transactionsValues = [user.user_id];
			const transactionsRes = await pool.query(
				transactionsQuery,
				transactionsValues,
			);

			const { rating, last_rating } = calculateRating(userRes.rows);
			const rating_change = ratingChangePercentage(rating, last_rating);

			const { total, last_total } = calculateActivity(
				requestsRes.rows,
				transactionsRes.rows,
			);
			const activity_change = activityChangePercentage(total, last_total);

			const recent_requests = requestsRes.rows.slice(0, 5);
			const recent_transactions = transactionsRes.rows.slice(0, 5);

			res.status(200).json({
				wallet: walletRes.rows[0],
				rating: {
					rate: rating,
					change: rating_change,
				},
				activity: {
					total: total,
					change: activity_change,
				},
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
