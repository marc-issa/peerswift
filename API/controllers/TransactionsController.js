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
	getTransactions: async (req, res) => {
		try {
			const userQuery = `SELECT * FROM users WHERE id = $1`;
			const countryQuery = `SELECT * FROM countries WHERE id = $1`;
			const ratingQuery = `SELECT * FROM user_ratings WHERE rated_user_id = $1`;

			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const page = parseInt(req.query.page) || 1;
			const pageSize = 10;
			const offset = (page - 1) * pageSize;

			const transactionsQuery = `SELECT * FROM transactions_history WHERE user_id = $1 ORDER BY date DESC LIMIT $2 OFFSET $3`;
			const transactionsRes = await pool.query(transactionsQuery, [
				user.id,
				pageSize,
				offset,
			]);

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

			res.status(200).json({
				status: "success",
				transactions: recent_transactions,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},

	getTransactionById: async (req, res) => {
		try {
			const userQuery = `SELECT * FROM users WHERE id = $1`;
			const countryQuery = `SELECT * FROM countries WHERE id = $1`;
			const ratingQuery = `SELECT * FROM user_ratings WHERE rated_user_id = $1`;

			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const transactionId = req.params.id;

			const transactionQuery = `SELECT * FROM transactions WHERE id = $1`;
			const transactionRes = await pool.query(transactionQuery, [
				transactionId,
			]);

			let transaction = transactionRes.rows[0];

			let partnerUser = {};
			let country = {};
			let rate = 0;
			if (transaction.initiator_user_id !== user.id) {
				const partnerUserRes = await pool.query(userQuery, [
					transaction.initiator_user_id,
				]);
				const countryRes = await pool.query(countryQuery, [
					partnerUserRes.rows[0].country,
				]);
				const ratingRes = await pool.query(ratingQuery, [
					transaction.initiator_user_id,
				]);
				partnerUser = partnerUserRes.rows[0];
				country = countryRes.rows[0];
				rate = calculateRating(ratingRes.rows);
			} else if (transaction.partner_user_id !== user.id) {
				const partnerUserRes = await pool.query(userQuery, [
					transaction.partner_user_id,
				]);
				const countryRes = await pool.query(countryQuery, [
					partnerUserRes.rows[0].country,
				]);
				const ratingRes = await pool.query(ratingQuery, [
					transaction.partner_user_id,
				]);
				partnerUser = partnerUserRes.rows[0];
				country = countryRes.rows[0];
				rate = calculateRating(ratingRes.rows);
			}
			transaction.user = partnerUser;
			transaction.user.flag = country.flag;
			transaction.user.currency = country.currency_code;
			transaction.user.rating = rate;

			res.status(200).json({
				status: "success",
				transaction: transaction,
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "User not found",
			});
		}
	},
};
