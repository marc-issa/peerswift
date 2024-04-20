import fetch from "node-fetch";
import baseUrl from "../../api client/BaseUrl";

const PostUser = async (user) => {
	console.log(user);
	try {
		const response = await fetch(`${baseUrl}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: error.message || "An error occurred during signup",
		};
	}
};

export default PostUser;
