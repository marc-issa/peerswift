import fetch from "node-fetch";
import baseUrl from "../BaseUrl";

const PostOTP = async (data) => {
	const reqData = {
		phone_number: data.phone_number,
		otp_code: data.otp,
	};
	try {
		const response = await fetch(`${baseUrl}/auth/verify-phone`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqData),
		});
		const data = await response.json();

		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message || "An error occurred during OTP verification",
		};
	}
};

export default PostOTP;
