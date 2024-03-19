class OTP {
	constructor() {
		this.sendOTP = this.sendOTP.bind(this);
		this.verifyOTP = this.verifyOTP.bind(this);
	}
	sendOTP(res, phone_number) {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_TOKEN;
		const verifySid = "VA0cd85b95d5e62e75281519c6af00fd08";
		const client = require("twilio")(accountSid, authToken);

		client.verify.v2
			.services(verifySid)
			.verifications.create({ to: phone_number, channel: "sms" })
			.then((verification) => {
				res
					.json({
						status: verification.status,
						message: "OTP sent to your phone number",
					})
					.status(200);
			})
			.catch((error) => {
				res.status(400).json({ status: "error", message: error.message });
			});
	}
	verifyOTP(phone_number, otp_code, res) {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_TOKEN;
		const verifySid = "VA0cd85b95d5e62e75281519c6af00fd08";
		const client = require("twilio")(accountSid, authToken);
		client.verify.v2
			.services(verifySid)
			.verificationChecks.create({ to: phone_number, code: otp_code })
			.then((verification_check) => {
				res
					.json({
						status: verification_check.status,
						message: "OTP verified successfully",
					})
					.status(200);
			})
			.catch((error) => {
				res.status(400).json({ status: "error", message: error.message });
			});
	}
}

module.exports = new OTP();
