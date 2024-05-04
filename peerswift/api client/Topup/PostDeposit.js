import fetch from "node-fetch";
import baseUrl from "../BaseUrl";
import * as SecureStore from "expo-secure-store";

const PostDeposit = async (reqData) => {
	const authToken = await SecureStore.getItemAsync("authToken");
	try {
		const response = await fetch(`${baseUrl}/topup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + authToken,
			},
			body: JSON.stringify(reqData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message || "An error occurred during fetching data.",
		};
	}
};

export default PostDeposit;
