require("dotenv").config();
module.exports = {
	login: (req, res) => {
		const { phone_number } = req.body;
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const verifySid = process.env.TWILIO_VERIFY_SID;
		const client = require("twilio")(accountSid, authToken);

		client.verify.v2
			.services(verifySid)
			.verifications.create({ to: phone_number, channel: "sms" })
			.then((verification) => console.log(verification.status));
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
		res.send("Auth Controller");
	},
	changePhone: (req, res) => {
		res.send("Auth Controller");
	},
};
