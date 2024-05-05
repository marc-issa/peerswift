const jwt = require("jsonwebtoken");
const pool = require("../modules/db");

module.exports = {
	sendSummary: async (req, res) => {
		try {
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);

			const wallet = `SELECT * FROM wallets WHERE user_id = $1`;
			const walletValues = [user.id];
			const walletRes = await pool.query(wallet, walletValues);

			const credit_cards = `SELECT * FROM credit_cards WHERE user_id = $1`;
			const credit_cardsValues = [user.id];
			const credit_cardsRes = await pool.query(
				credit_cards,
				credit_cardsValues,
			);

			const contactsQuery = `SELECT * FROM user_contacts WHERE user_id = $1`;
			const contactsValues = [user.id];
			const contactsRes = await pool.query(contactsQuery, contactsValues);

			for (let i = 0; i < contactsRes.rows.length; i++) {
				if (contactsRes.rows[i].contact_user_id) {
					const contactQuery = `SELECT * FROM users WHERE id = $1`;
					const contactRes = await pool.query(contactQuery, [
						contactsRes.rows[i].contact_user_id,
					]);
					contactsRes.rows[i].contact = contactRes.rows[0];

					const countryQuery = `SELECT * FROM countries WHERE id = $1`;
					const countryRes = await pool.query(countryQuery, [
						contactsRes.rows[i].contact.country,
					]);
					contactsRes.rows[i].contact.country = countryRes.rows[0];
				}
			}

			return res.status(200).json({
				status: "success",
				accounts: {
					wallet: walletRes.rows[0],
					credit_cards: credit_cardsRes.rows,
				},
				contacts: contactsRes.rows,
			});
		} catch (error) {
			return res.status(500).json({
				status: "error",
				message:
					error.message || "An error occurred while fetching user summary",
			});
		}
	},
	sendMoney: async (req, res) => {
		const client = await pool.connect(); // Acquire a client from the pool

		try {
			await client.query("BEGIN"); // Start a transaction
			const user = jwt.decode(req.headers.authorization.split(" ")[1]);
			const { recepient_id, amount, selected_account, account_type } = req.body;

			if (account_type === "wallet") {
				const verifyWallet = `SELECT * FROM wallets WHERE id = $1 FOR UPDATE`; // Lock the selected wallet row for update
				const verifyWalletValues = [selected_account];
				const verifyWalletRes = await client.query(
					verifyWallet,
					verifyWalletValues,
				);

				if (verifyWalletRes.rows[0].balance - amount < 0) {
					throw new Error("Insufficient funds");
				}

				const walletQuery = `UPDATE wallets SET balance = balance - $1 WHERE id = $2 RETURNING *`;
				const walletValues = [amount, selected_account];
				await client.query(walletQuery, walletValues);
			} else {
				const cardQuery = `UPDATE credit_cards SET balance = balance - $1 WHERE id = $2 RETURNING *`;
				const cardValues = [amount, selected_account];
				await client.query(cardQuery, cardValues);
			}

			const transactionQuery = `INSERT INTO transactions (initiator_user_id, partner_user_id, amount, currency, status, creation_date, completion_date, fee) VALUES ($1, $2, $3, 'USD', 'Completed', NOW(), NOW(), 0.00) RETURNING *`;
			const transactionValues = [user.id, recepient_id, amount];
			const transactionRes = await client.query(
				transactionQuery,
				transactionValues,
			);

			const transactionHistory = `INSERT INTO transactions_history(transaction_id, top_up_id, user_id, date) VALUES ($1, NULL, $2, NOW())`;
			const transactionHistoryValues = [transactionRes.rows[0].id, user.id];
			await client.query(transactionHistory, transactionHistoryValues);

			const rTransactionHistory = `INSERT INTO transactions_history(transaction_id, top_up_id, user_id, date) VALUES ($1, NULL, $2, NOW())`;
			const rTransactionHistoryValues = [
				transactionRes.rows[0].id,
				recepient_id,
			];

			await client.query(rTransactionHistory, rTransactionHistoryValues);

			const addWalletQuery = `UPDATE wallets SET balance = balance + $1 WHERE user_id = $2 RETURNING *`;
			const addWalletValues = [amount, recepient_id];
			await client.query(addWalletQuery, addWalletValues);

			await client.query("COMMIT"); // Commit the transaction

			return res.status(200).json({
				status: "success",
				message: "Transaction successful",
			});
		} catch (error) {
			await client.query("ROLLBACK"); // Rollback the transaction in case of an error
			return res.status(500).json({
				status: "error",
				message: error.message || "An error occurred while sending money",
			});
		} finally {
			client.release(); // Release the client back to the pool
		}
	},
};
