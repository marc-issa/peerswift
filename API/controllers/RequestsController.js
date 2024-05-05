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
						const countryRes = await pool.query(countryQuery, [
							unmatchedRequestsRes.rows[0].destination_country_id,
						]);
						unmatchedRequestsRes.rows[0].destination_country =
							countryRes.rows[0];
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

			const fee = amount * 0.01;

			const deductBalanceQuery = `UPDATE wallets SET balance = balance - $1 - $2 WHERE user_id = $3 RETURNING *`;
			const deductBalanceRes = await client.query(deductBalanceQuery, [
				amount,
				fee,
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
				const updateRequestHistoryOtherRes = await client.query(
					updateRequestHistoryQuery,
					[matchedRequestRes.rows[0].id, unmatchedRequestRes.rows[0].id], // Updated
				);

				const holdPartnerUserQuery = `INSERT INTO holds(request_id, user_id, amount, currency, hold_placed_time, hold_released_time, status) VALUES($1, $2, $3, 'USD', NOW(), NULL, 'Active') RETURNING *`;
				const holdPartnerUserRes = await client.query(holdPartnerUserQuery, [
					updateRequestHistoryRes.rows[0].id,
					checkMatchRes.rows[0].user_id,
					amount,
				]);
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
	cancelRequest: async (req, res) => {
		const client = await pool.connect(); // Acquire a client from the pool
		const { request_id } = req.body;
		const user = jwt.decode(req.headers.authorization.split(" ")[1]);
		try {
			await client.query("BEGIN"); // Start a transaction

			const refundBalanceQuery = `UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING *`;

			const requestHistoryQuery = `SELECT * FROM requests_history WHERE id = $1`;
			const requestHistoryRes = await client.query(requestHistoryQuery, [
				request_id,
			]);

			if (requestHistoryRes.rows[0].matched_id) {
				const updateRequestHistoryQuery = `UPDATE requests_history SET date = NOW() WHERE matched_id = $1 RETURNING *`;
				const matchedRequestQuery = `UPDATE matched_requests SET status = 'Cancelled' WHERE id = $1 RETURNING *`;
				const matchedRequestRes = await client.query(matchedRequestQuery, [
					requestHistoryRes.rows[0].matched_id,
				]);
				if (user.id === matchedRequestRes.rows[0].user1_id) {
					const refundPartnerBalanceRes = await client.query(
						refundBalanceQuery,
						[
							matchedRequestRes.rows[0].amount,
							matchedRequestRes.rows[0].user2_id,
						],
					);
				} else {
					const refundPartnerBalanceRes = await client.query(
						refundBalanceQuery,
						[
							matchedRequestRes.rows[0].amount,
							matchedRequestRes.rows[0].user1_id,
						],
					);
				}
				const updateRequestHistoryRes = await client.query(
					updateRequestHistoryQuery,
					[requestHistoryRes.rows[0].matched_id],
				);
			} else {
				const updateRequestHistoryQuery = `UPDATE requests_history SET date = NOW() WHERE unmatched_id = $1 RETURNING *`;
				const unmatchedRequestQuery = `Update unmatched_requests SET status = 'Cancelled' WHERE id = $1 RETURNING *`;
				const unmatchedRequestRes = await client.query(unmatchedRequestQuery, [
					requestHistoryRes.rows[0].unmatched_id,
				]);
				const refundBalanceRes = await client.query(refundBalanceQuery, [
					unmatchedRequestRes.rows[0].amount,
					requestHistoryRes.rows[0].user_id,
				]);
				const updateRequestHistoryRes = await client.query(
					updateRequestHistoryQuery,
					[requestHistoryRes.rows[0].unmatched_id],
				);
			}

			const updateHold = `UPDATE holds SET status = 'Cancelled' WHERE request_id = $1 RETURNING *`;
			const updateHoldRes = await client.query(updateHold, [request_id]);

			await client.query("COMMIT"); // Commit the transaction

			res.status(200).json({
				status: "success",
				message: "Request cancelled successfully",
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
	confirmTransfer: async (req, res) => {
		const client = await pool.connect(); // Acquire a client from the pool
		const { request_id } = req.body;
		const user = jwt.decode(req.headers.authorization.split(" ")[1]);

		try {
			await client.query("BEGIN"); // Start a transaction

			const requestHistoryQuery = `SELECT * FROM requests_history WHERE id = $1`;
			const requestHistoryRes = await client.query(requestHistoryQuery, [
				request_id,
			]);

			const matchedRequestQuery = `SELECT * FROM matched_requests WHERE id = $1`;
			const matchedRequestRes = await client.query(matchedRequestQuery, [
				requestHistoryRes.rows[0].matched_id,
			]);

			if (user.id === matchedRequestRes.rows[0].user1_id) {
				const updateMatchedRequestQuery = `UPDATE matched_requests SET user1_transfer_confirmed = true WHERE id = $1 RETURNING *`;
				const updateMatchedRequestRes = await client.query(
					updateMatchedRequestQuery,
					[requestHistoryRes.rows[0].matched_id],
				);
			} else {
				const updateMatchedRequestQuery = `UPDATE matched_requests SET user2_transfer_confirmed = true WHERE id = $1 RETURNING *`;
				const updateMatchedRequestRes = await client.query(
					updateMatchedRequestQuery,
					[requestHistoryRes.rows[0].matched_id],
				);
			}

			const checkMatchedStatus = `SELECT * FROM matched_requests WHERE id = $1`;
			const checkMatchedStatusRes = await client.query(checkMatchedStatus, [
				requestHistoryRes.rows[0].matched_id,
			]);

			if (
				checkMatchedStatusRes.rows[0].user1_transfer_confirmed &&
				checkMatchedStatusRes.rows[0].user2_transfer_confirmed &&
				checkMatchedStatusRes.rows[0].user1_received_confirmed &&
				checkMatchedStatusRes.rows[0].user2_received_confirmed
			) {
				const updateMatchedRequestQuery = `UPDATE matched_requests SET status = 'Completed', completion_date = NOW() WHERE id = $1 RETURNING *`;
				const updateMatchedRequestRes = await client.query(
					updateMatchedRequestQuery,
					[requestHistoryRes.rows[0].matched_id],
				);

				const updateRequestHistoryQuery = `UPDATE requests_history SET date = NOW() WHERE matched_id = $1 RETURNING *`;
				const updateRequestHistoryRes = await client.query(
					updateRequestHistoryQuery,
					[requestHistoryRes.rows[0].matched_id],
				);

				const updateHoldQuery = `UPDATE holds SET hold_released_time = NOW() WHERE request_id = $1 RETURNING *`;
				const updateHoldRes = await client.query(updateHoldQuery, [request_id]);

				const walletUpdate = `UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING *`;
				const walletUpdateRes = await client.query(walletUpdate, [
					checkMatchedStatusRes.rows[0].amount,
					user.id,
				]);
			}

			await client.query("COMMIT"); // Commit the transaction

			res.status(200).json({
				status: "success",
				message: "Transfer confirmed successfully",
			});
		} catch (error) {
			await client.query("ROLLBACK"); // Rollback the transaction in case of an error
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},
	confirmReceived: async (req, res) => {
		const client = await pool.connect(); // Acquire a client from the pool
		const { request_id } = req.body;
		const user = jwt.decode(req.headers.authorization.split(" ")[1]);
		let user2_id = 0;

		try {
			await client.query("BEGIN"); // Start a transaction

			const requestHistoryQuery = `SELECT * FROM requests_history WHERE id = $1`;
			const requestHistoryRes = await client.query(requestHistoryQuery, [
				request_id,
			]);

			const matchedRequestQuery = `SELECT * FROM matched_requests WHERE id = $1`;
			const matchedRequestRes = await client.query(matchedRequestQuery, [
				requestHistoryRes.rows[0].matched_id,
			]);

			if (user.id === matchedRequestRes.rows[0].user1_id) {
				user2_id = matchedRequestRes.rows[0].user2_id;
				const updateMatchedRequestQuery = `UPDATE matched_requests SET user1_received_confirmed = true WHERE id = $1 RETURNING *`;
				const updateMatchedRequestRes = await client.query(
					updateMatchedRequestQuery,
					[requestHistoryRes.rows[0].matched_id],
				);
			} else {
				user2_id = matchedRequestRes.rows[0].user1_id;
				const updateMatchedRequestQuery = `UPDATE matched_requests SET user2_received_confirmed = true WHERE id = $1 RETURNING *`;
				const updateMatchedRequestRes = await client.query(
					updateMatchedRequestQuery,
					[requestHistoryRes.rows[0].matched_id],
				);
			}

			const checkMatchedStatus = `SELECT * FROM matched_requests WHERE id = $1`;
			const checkMatchedStatusRes = await client.query(checkMatchedStatus, [
				requestHistoryRes.rows[0].matched_id,
			]);

			if (
				checkMatchedStatusRes.rows[0].user1_transfer_confirmed &&
				checkMatchedStatusRes.rows[0].user2_transfer_confirmed &&
				checkMatchedStatusRes.rows[0].user1_received_confirmed &&
				checkMatchedStatusRes.rows[0].user2_received_confirmed
			) {
				const updateMatchedRequestQuery = `UPDATE matched_requests SET status = 'Completed', completion_date = NOW() WHERE id = $1 RETURNING *`;
				const updateMatchedRequestRes = await client.query(
					updateMatchedRequestQuery,
					[requestHistoryRes.rows[0].matched_id],
				);

				const updateRequestHistoryQuery = `UPDATE requests_history SET date = NOW() WHERE matched_id = $1 RETURNING *`;
				const updateRequestHistoryRes = await client.query(
					updateRequestHistoryQuery,
					[requestHistoryRes.rows[0].matched_id],
				);

				const updateHoldQuery = `UPDATE holds SET hold_released_time = NOW(), status = 'Released' WHERE user_id = $1 RETURNING *`;
				const updateHoldRes = await client.query(updateHoldQuery, [user.id]);
				const updateHoldRes2 = await client.query(updateHoldQuery, [user2_id]);

				const walletUpdate = `UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING *`;
				const walletUpdateRes = await client.query(walletUpdate, [
					checkMatchedStatusRes.rows[0].amount,
					user.id,
				]);
				const walletUpdate2Res = await client.query(walletUpdate, [
					checkMatchedStatusRes.rows[0].amount,
					user2_id,
				]);
			}

			await client.query("COMMIT"); // Commit the transaction

			res.status(200).json({
				status: "success",
				message: "Transfer confirmed successfully",
			});
		} catch (error) {
			await client.query("ROLLBACK"); // Rollback the transaction in case of an error
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},
};
