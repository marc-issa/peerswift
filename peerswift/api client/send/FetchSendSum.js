import fetch from "node-fetch";
import baseUrl from "../BaseUrl";
import * as SecureStore from "expo-secure-store";

const FetchSendSum = async () => {
	const authToken = await SecureStore.getItemAsync("authToken");
	try {
		const response = await fetch(`${baseUrl}/send/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + authToken,
			},
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

export default FetchSendSum;
