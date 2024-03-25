require("dotenv").config();
const jwt = require("jsonwebtoken");
const otpVerf = require("../modules/OTP");
const pool = require("../modules/db");

module.exports = {
	login: async (req, res) => {
		try {
			const { phone_number } = req.body;
			const verification = await otpVerf.sendOTP(phone_number);
			res.status(200).json({
				status: verification.status,
				message: "OTP sent successfully",
			});
		} catch (error) {
			res.status(400).json({
				status: "error",
				message: error.message || "OTP not sent",
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
				const verification = { status: "success" };

				res.status(200).json({
					status: verification.status,
					message: "Phone number verified successfully",
					user: dbRes.rows[0],
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

	signup: (req, res) => {
		const { phone_number, full_name, mid_name, dob, country_id, pin } =
			req.body;
		const queryText = `INSERT INTO users (phone_number, full_name, mid, dob, country_id, kyc_status, pin, registration_date, last_login_date) VALUES ($1, $2, $3, $4, $5, false, $6, NOW(), NOW()) RETURNING *`;
		const values = [phone_number, full_name, mid_name, dob, country_id, pin];

		pool.query(queryText, values, (error, results) => {
			if (error) {
				res.status(400).json({
					status: "error",
					message: error.message || "User not created",
				});
			} else {
				res.status(201).json({
					status: "success",
					message: "User created successfully",
					user: results.rows[0],
					jwt: jwt.sign(results.rows[0], process.env.JWT_SECRET, {
						expiresIn: "30d",
					}),
				});
			}
		});
	},

	pinAccees: (req, res) => {
		const { pin, phone_number } = req.body;
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
						user: results.rows[0],
						jwt: jwt.sign(results.rows[0], process.env.JWT_SECRET, {
							expiresIn: "30d",
						}),
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
};
