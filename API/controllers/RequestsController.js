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
};
