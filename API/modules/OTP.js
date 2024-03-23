class OTP {
	constructor() {
		this.sendOTP = this.sendOTP.bind(this);
		this.verifyOTP = this.verifyOTP.bind(this);
	}

	sendOTP(phone_number) {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_TOKEN;
		const verifySid = "VA0cd85b95d5e62e75281519c6af00fd08";
		const client = require("twilio")(accountSid, authToken);

		return client.verify.v2
			.services(verifySid)
			.verifications.create({ to: phone_number, channel: "sms" });
	}

	verifyOTP(phone_number, otp_code) {
		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_TOKEN;
		const verifySid = "VA0cd85b95d5e62e75281519c6af00fd08";
		const client = require("twilio")(accountSid, authToken);

		return client.verify.v2
			.services(verifySid)
			.verificationChecks.create({ to: phone_number, code: otp_code });
	}
}

module.exports = new OTP();
