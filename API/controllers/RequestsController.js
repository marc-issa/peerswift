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

module.exports = {
	getRequests: async (req, res) => {
		try {
			const userQuery = `SELECT * FROM users WHERE id = $1`;
			const countryQuery = `SELECT * FROM countries WHERE id = $1`;
			const ratingQuery = `SELECT * FROM user_ratings WHERE rated_user_id = $1`;

			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const page = parseInt(req.query.page) || 1;
			const pageSize = 10;
			const offset = (page - 1) * pageSize;

			const requestsHistory = `SELECT * FROM requests_history WHERE user_id = $1 ORDER BY date DESC LIMIT $2 OFFSET $3`;

			const requestsHistoryRes = await pool.query(requestsHistory, [
				user.id,
				pageSize,
				offset,
			]);

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
			res.status(200).json({
				status: "success",
				requests: recent_requests,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},
	sendRequest: async (req, res) => {
		const client = await pool.connect(); // Acquire a client from the pool

		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const { amount, country } = req.body;

			await client.query("BEGIN"); // Start a transaction

			const walletQuery = `SELECT * FROM wallets WHERE user_id = $1`;
			const walletRes = await client.query(walletQuery, [user.id]);

			if (walletRes.rows[0].balance < amount) {
				res.status(400).json({
					status: "error",
					message: "Insufficient balance",
				});
				return;
			}

			const unmatchedRequestQuery = `INSERT INTO unmatched_requests(user_id, amount, currency, destination_country_id, status, creation_date) VALUES($1, $2, 'USD', $3, 'Matching', NOW()) RETURNING *`;
			const unmatchedRequestRes = await client.query(unmatchedRequestQuery, [
				user.id,
				amount,
				country,
			]);

			const requestHistoryQuery = `INSERT INTO requests_history(unmatched_id, matched_id, user_id, date) VALUES($1, NULL,$2, NOW()) RETURNING *`;
			const requestHistoryRes = await client.query(requestHistoryQuery, [
				unmatchedRequestRes.rows[0].id,
				user.id,
			]);

			const deductBalanceQuery = `UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 RETURNING *`;
			const deductBalanceRes = await client.query(deductBalanceQuery, [
				amount,
				user.id,
			]);

			const holdBalanceQuery = `INSERT INTO holds(request_id, user_id, amount, currency, hold_placed_time, hold_released_time, status) VALUES($1, $2, $3,'USD', NOW(), NULL, 'Active') RETURNING *`;
			const holdBalanceRes = await client.query(holdBalanceQuery, [
				requestHistoryRes.rows[0].id,
				user.id,
				amount,
			]);

			const userCountryQuery = `SELECT * FROM countries WHERE id = $1`;
			const userCountryRes = await client.query(userCountryQuery, [
				user.country,
			]);

			const checkMatch = `SELECT * FROM unmatched_requests WHERE amount = $1 AND destination_country_id = $2 AND status = 'Matching' AND user_id <> $3 FOR UPDATE`;
			const checkMatchRes = await client.query(checkMatch, [
				amount,
				userCountryRes.rows[0].id,
				user.id,
			]);

			if (checkMatchRes.rows.length > 0) {
				const matchedRequestQuery = `INSERT INTO matched_requests(user1_id, user2_id, amount, currency, user1_transfer_confirmed, user2_transfer_confirmed, user1_received_confirmed, user2_received_confirmed, status, creation_date, completion_date) VALUES($1, $2, $3, 'USD', false, false, false, false, 'Pending', NOW(), NULL) RETURNING *`;
				const matchedRequestRes = await client.query(matchedRequestQuery, [
					user.id,
					checkMatchRes.rows[0].user_id,
					amount,
				]);

				const updateUnmatchedRequestQuery = `UPDATE unmatched_requests SET status = 'Matched' WHERE id = $1 RETURNING *`;
				const updateUnmatchedRequestRes = await client.query(
					updateUnmatchedRequestQuery,
					[checkMatchRes.rows[0].id],
				);

				const updateUnmatchedRequestRes2 = await client.query(
					updateUnmatchedRequestQuery,
					[unmatchedRequestRes.rows[0].id], // Updated
				);

				const updateRequestHistoryQuery = `UPDATE requests_history SET matched_id = $1 WHERE unmatched_id = $2 RETURNING *`;
				const updateRequestHistoryRes = await client.query(
					updateRequestHistoryQuery,
					[matchedRequestRes.rows[0].id, checkMatchRes.rows[0].id],
				);
			}

			await client.query("COMMIT"); // Commit the transaction

			res.status(200).json({
				status: "success",
				message: "Request sent successfully",
			});
		} catch (error) {
			await client.query("ROLLBACK"); // Rollback the transaction in case of an error
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		} finally {
			client.release(); // Release the client back to the pool
		}
	},
};
