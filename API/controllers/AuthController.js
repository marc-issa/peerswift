require("dotenv").config();
module.exports = {
	sendOTP(phone_number) {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_TOKEN;
		const verifySid = "VA0cd85b95d5e62e75281519c6af00fd08";
		const client = require("twilio")(accountSid, authToken);

		client.verify.v2
			.services(verifySid)
			.verifications.create({ to: phone_number, channel: "sms" })
			.then((verification) => {
				// Send a response in the then block
				res.json({
					status: verification.status,
					message: "OTP sent to your phone number",
				});
			})
			.catch((error) => {
				// Send a response in the catch block
				res.status(400).json({ status: "error", message: error.message });
			});
	},
	verifyOTP: (req, res) => {
		const { phone_number, otp_code } = req.body;
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const verifySid = "VA0cd85b95d5e62e75281519c6af00fd08";
		const client = require("twilio")(accountSid, authToken);
		client.verify.v2
			.services(verifySid)
			.verificationChecks.create({ to: phone_number, code: otp_code })
			.then((verification_check) => console.log(verification_check.status))
			.then(() => readline.close());
	},
	login: (req, res) => {
		const { phone_number } = req.body;
		sendOTP(phone_number);
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
	verifyPhone: (req, res) => {
		const { phone_number, otp_code } = req.body;
		verifyOTP(phone_number, otp_code);
	},
	changePhone: (req, res) => {
		res.send("Auth Controller");
	},
};
