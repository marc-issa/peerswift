require("dotenv").config();
const otpVerf = require("../modules/OTP");

module.exports = {
	login: (req, res) => {
		const { phone_number } = req.body;
		otpVerf.sendOTP(res, phone_number);
	},
	verifyPhone: (req, res) => {
		const { phone_number, otp_code } = req.body;
		otpVerf.verifyOTP(phone_number, otp_code, res);
	},
	signup: (req, res) => {
		res.send("Auth Controller");
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
