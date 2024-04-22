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
			const userQuery = `SELECT * FROM users WHERE id = $1`;
			const countryQuery = `SELECT * FROM countries WHERE id = $1`;

			const walletQuery = `SELECT * FROM wallets WHERE user_id = $1`;
			const walletValues = [user.id];
			const walletRes = await pool.query(walletQuery, walletValues);

			const ratingQuery = `SELECT * FROM user_ratings WHERE rated_user_id = $1`;
			const ratingValues = [user.id];
			const userRes = await pool.query(ratingQuery, ratingValues);

			const requestsHistory = `SELECT * FROM requests_history WHERE user_id = $1 ORDER BY date DESC LIMIT 5`;

			const requestsHistoryRes = await pool.query(requestsHistory, [user.id]);

			let recent_requests = [];

			for (let i = 0; i < requestsHistoryRes.rows.length; i++) {
				if (requestsHistoryRes.rows[i].matched_id) {
					const matchedRequestsQuery = `SELECT * FROM matched_requests WHERE id = $1`;
					const matchedRequestsRes = await pool.query(matchedRequestsQuery, [
						requestsHistoryRes.rows[i].matched_id,
					]);
					matchedRequestsRes.rows[0].id = requestsHistoryRes.rows[i].id;
					for (let j = 0; j < matchedRequestsRes.rows.length; j++) {
						let partnerUser = {};
						let country = {};
						let rate = 0;
						if (matchedRequestsRes.rows[j].user1_id !== user.id) {
							const partnerUserRes = await pool.query(userQuery, [
								matchedRequestsRes.rows[j].user1_id,
							]);
							const countryRes = await pool.query(countryQuery, [
								partnerUserRes.rows[0].country,
							]);
							const ratingRes = await pool.query(ratingQuery, [
								matchedRequestsRes.rows[j].user1_id,
							]);
							partnerUser = partnerUserRes.rows[0];
							country = countryRes.rows[0];
							rate = calculateRating(ratingRes.rows);
						} else if (matchedRequestsRes.rows[j].user2_id !== user.id) {
							const partnerUserRes = await pool.query(userQuery, [
								matchedRequestsRes.rows[j].user2_id,
							]);
							const countryRes = await pool.query(countryQuery, [
								partnerUserRes.rows[0].country,
							]);
							const ratingRes = await pool.query(ratingQuery, [
								matchedRequestsRes.rows[j].user2_id,
							]);
							partnerUser = partnerUserRes.rows[0];
							country = countryRes.rows[0];
							rate = calculateRating(ratingRes.rows);
						}
						matchedRequestsRes.rows[j].user = partnerUser;
						matchedRequestsRes.rows[j].user.flag = country.flag;
						matchedRequestsRes.rows[j].user.currency = country.currency_code;
						matchedRequestsRes.rows[j].user.rating = rate;
					}

					recent_requests.push(matchedRequestsRes.rows[0]);
				} else {
					const unmatchedRequestsQuery = `SELECT * FROM unmatched_requests WHERE id = $1 and status <> 'Matched'`;
					const unmatchedRequestsRes = await pool.query(
						unmatchedRequestsQuery,
						[requestsHistoryRes.rows[i].unmatched_id],
					);
					if (unmatchedRequestsRes.rows.length > 0) {
						unmatchedRequestsRes.rows[0].id = requestsHistoryRes.rows[i].id;
						recent_requests.push(unmatchedRequestsRes.rows[0]);
					}
				}
			}

			const transactionsQuery = `SELECT * FROM transactions_history WHERE user_id = $1 ORDER BY date DESC LIMIT 5`;
			const transactionsRes = await pool.query(transactionsQuery, [user.id]);

			let recent_transactions = [];

			for (let i = 0; i < transactionsRes.rows.length; i++) {
				if (transactionsRes.rows[i].transaction_id) {
					const transactionQuery = `SELECT * FROM transactions WHERE id = $1`;
					const transactionRes = await pool.query(transactionQuery, [
						transactionsRes.rows[i].transaction_id,
					]);
					transactionRes.rows[0].id = transactionsRes.rows[i].id;
					for (let j = 0; j < transactionRes.rows.length; j++) {
						let partnerUser = {};
						let country = {};
						let rate = 0;
						if (transactionRes.rows[j].initiator_user_id !== user.id) {
							const partnerUserRes = await pool.query(userQuery, [
								transactionRes.rows[j].initiator_user_id,
							]);
							const countryRes = await pool.query(countryQuery, [
								partnerUserRes.rows[0].country,
							]);
							const ratingRes = await pool.query(ratingQuery, [
								transactionRes.rows[j].initiator_user_id,
							]);
							partnerUser = partnerUserRes.rows[0];
							country = countryRes.rows[0];
							rate = calculateRating(ratingRes.rows);
						} else if (transactionRes.rows[j].partner_user_id !== user.id) {
							const partnerUserRes = await pool.query(userQuery, [
								transactionRes.rows[j].partner_user_id,
							]);
							const countryRes = await pool.query(countryQuery, [
								partnerUserRes.rows[0].country,
							]);
							const ratingRes = await pool.query(ratingQuery, [
								transactionRes.rows[j].partner_user_id,
							]);
							partnerUser = partnerUserRes.rows[0];
							country = countryRes.rows[0];
							rate = calculateRating(ratingRes.rows);
						}
						transactionRes.rows[j].user = partnerUser;
						transactionRes.rows[j].user.flag = country.flag;
						transactionRes.rows[j].user.currency = country.currency_code;
						transactionRes.rows[j].user.rating = rate;
					}
					recent_transactions.push(transactionRes.rows[0]);
				} else {
					const topupQuery = `SELECT * FROM top_ups WHERE id = $1`;
					const topupRes = await pool.query(topupQuery, [
						transactionsRes.rows[i].top_up_id,
					]);
					topupRes.rows[0].id = transactionsRes.rows[i].id;
					recent_transactions.push(topupRes.rows[0]);
				}
			}

			const rating = calculateRating(userRes.rows);

			const total = calculateActivity(
				requestsHistoryRes.rows,
				transactionsRes.rows,
			);

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
