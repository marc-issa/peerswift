require("dotenv").config();
const jwt = require("jsonwebtoken");
const otpVerf = require("../modules/OTP");
const pool = require("../modules/db");

module.exports = {
	login: async (req, res) => {
		try {
			const { phone_number } = req.body;

			const queryText = `SELECT * FROM users WHERE phone_number = $1`;
			const values = [phone_number];
			const poolRes = await pool.query(queryText, values);
			if (poolRes.rows.length > 0) {
				try {
					const verification = await otpVerf.sendOTP(phone_number);
					res.status(200).json({
						status: verification.status,
						message: "OTP sent successfully",
						user: poolRes.rows[0],
					});
				} catch (err) {
					res.status(400).json({
						status: "error",
						message: "OTP not sent",
					});
				}
			} else {
				res.status(400).json({
					status: "error",
					message: "User not found",
				});
			}
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "An error occurred during login",
			});
		}
	},
	verifyPhone: async (req, res) => {
		const { phone_number, otp_code } = req.body;
		try {
			const queryText = `SELECT * FROM users WHERE phone_number = $1`;
			const values = [phone_number];
			const dbRes = await pool.query(queryText, values);

			if (dbRes.rows.length > 0) {
				const verification = await otpVerf.verifyOTP(phone_number, otp_code);
				res.status(200).json({
					status: verification.status,
					message: "Phone number verified successfully",
					user: dbRes.rows[0],
					jwt: jwt.sign(dbRes.rows[0], process.env.JWT_SECRET, {
						expiresIn: "30d",
					}),
				});
			} else {
				res.status(400).json({
					status: "error",
					message: "User not found",
				});
			}
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "Phone number verification failed",
			});
		}
	},

	signup: async (req, res) => {
		const { phone_number, full_name, mid_name, dob, country_id, group_id } =
			req.body;

		try {
			// Start a transaction
			await pool.query("BEGIN");

			// Insert user
			const queryText = `INSERT INTO users (phone_number, full_name, mid, dob, country_id, kyc_status, pin, registration_date, last_login_date) VALUES ($1, $2, $3, $4, $5, false, null, NOW(), NOW()) RETURNING *`;
			const userValues = [phone_number, full_name, mid_name, dob, country_id];
			const userResult = await pool.query(queryText, userValues);
			const user_id = userResult.rows[0].user_id;

			// Insert wallet
			const walletQuery = `INSERT INTO wallets (user_id, balance, currency) VALUES ($1, 0, 'USD') RETURNING *`;
			await pool.query(walletQuery, [user_id]);

			// Insert user_group_membership
			const userGroupQuery = `INSERT INTO user_group_memberships (user_id, group_id, join_date) VALUES ($1, $2, NOW()) RETURNING *`;
			await pool.query(userGroupQuery, [user_id, group_id]);

			// Commit transaction
			await pool.query("COMMIT");

			// const verification = await otpVerf.sendOTP(phone_number);

			res.status(200).json({
				status: "success",
				message: "User created successfully",
				user: userResult.rows[0],
			});
		} catch (error) {
			// Rollback transaction on error
			await pool.query("ROLLBACK");
			console.error("Error in signup:", error.stack);
			res.status(500).json({
				status: "error",
				message: error.message || "An error occurred during signup",
			});
		}
	},

	pinAccees: (req, res) => {
		const { pin } = req.body;
		// Extract the JWT token from the Authorization header
		const authHeader = req.headers.authorization;
		if (!authHeader) throw new Error("No token provided");

		const token = authHeader.split(" ")[1];
		if (!token) throw new Error("Bearer token not formatted properly");

		// Decode the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Extract phone_number from the decoded token
		const phone_number = decoded.phone_number;
		if (!phone_number)
			throw new Error("Phone number not included in the token");

		const queryText = `SELECT * FROM users WHERE pin = $1 AND phone_number = $2`;
		const values = [pin, phone_number];

		pool.query(queryText, values, (error, results) => {
			if (error) {
				res.status(400).json({
					status: "error",
					message: error.message || "Pin not verified",
				});
			} else {
				if (results.rows.length > 0) {
					res.status(200).json({
						status: "success",
						message: "Pin verified successfully",
					});
				} else {
					res.status(400).json({
						status: "error",
						message: "Pin not verified",
					});
				}
			}
		});
	},

	pinInsert: (req, res) => {
		try {
			// Extract the JWT token from the Authorization header
			const authHeader = req.headers.authorization;
			if (!authHeader) throw new Error("No token provided");

			const token = authHeader.split(" ")[1];
			if (!token) throw new Error("Bearer token not formatted properly");

			// Decode the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Extract phone_number from the decoded token
			const phone_number = decoded.phone_number;
			if (!phone_number)
				throw new Error("Phone number not included in the token");

			const { pin } = req.body;
			const queryText = `UPDATE users SET pin = $1 WHERE phone_number = $2 RETURNING *`;

			const values = [pin, phone_number];

			pool.query(queryText, values, (error, results) => {
				if (error) {
					res.status(400).json({
						status: "error",
						message: error.message || "Pin not inserted",
					});
				} else {
					if (results.rows.length > 0) {
						console.log(results.rows[0]);
						res.status(200).json({
							status: "success",
							message: "Pin inserted successfully",
							jwt: jwt.sign(results.rows[0], process.env.JWT_SECRET, {
								expiresIn: "30d",
							}),
						});
					} else {
						res.status(400).json({
							status: "error",
							message: "Pin not inserted",
						});
					}
				}
			});
		} catch (error) {
			res.status(401).json({
				status: "error",
				message: error.message || "Unauthorized",
			});
		}
	},
};
