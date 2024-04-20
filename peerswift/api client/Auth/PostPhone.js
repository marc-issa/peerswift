import fetch from "node-fetch";
import baseUrl from "../../api client/BaseUrl";

const PostPhone = async (phone_number) => {
	const reqData = {
		phone_number: phone_number,
	};
	try {
		const response = await fetch(`${baseUrl}/auth/login`, {
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
			message: error.message || "An error occurred during login",
		};
	}
};

export default PostPhone;
