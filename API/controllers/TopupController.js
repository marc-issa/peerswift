const jwt = require("jsonwebtoken");
const pool = require("../modules/db");

module.exports = {
	deposit: async (req, res) => {
		const client = await pool.connect(); // Acquire a client from the pool

		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const { amount } = req.body;

			await client.query("BEGIN"); // Start a transaction

			const walletQuery = `UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING *`;
			const walletValues = [amount, user.id];
			const walletRes = await client.query(walletQuery, walletValues);

			const topupQuery = `INSERT INTO top_ups (user_id, amount, currency, time, source) VALUES ($1, $2, 'USD', NOW(), 'CreditCard') RETURNING *`;
			const topupValues = [user.id, amount];
			const topUpRes = await client.query(topupQuery, topupValues);

			const transactionHistory = `INSERT INTO transactions_history(transaction_id, top_up_id, user_id, date) VALUES (NULL, $1, $2, NOW())`;
			const transactionHistoryValues = [topUpRes.rows[0].id, user.id];
			await client.query(transactionHistory, transactionHistoryValues);

			await client.query("COMMIT"); // Commit the transaction

			return res.status(200).json({
				status: "success",
				message: "Deposit successful",
			});
		} catch (error) {
			await client.query("ROLLBACK"); // Rollback the transaction in case of an error
			return res.status(500).json({
				status: "error",
				message: error.message || "An error occurred while depositing money",
			});
		} finally {
			client.release(); // Release the client back to the pool
		}
	},
};
