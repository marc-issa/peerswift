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
		const { phone_number, full_name, mid_name, dob } = req.body;
		const queryText = `INSERT INTO users (phone_number, full_name, mid, dob, nationality, kyc_status, pin, registration_date, last_login_date) VALUES ($1, $2, $3, $4, 'LBN', false, 0,NOW(), NOW()) RETURNING *`;
		const values = [phone_number, full_name, mid_name, dob];

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
	logout: (req, res) => {
		res.send("Auth Controller");
	},
	forgotPassword: (req, res) => {
		res.send("Auth Controller");
	},
	resetPassword: (req, res) => {
		res.send("Auth Controller");
	},
	changePhone: (req, res) => {
		res.send("Auth Controller");
	},
};
