import fetch from "node-fetch";
import baseUrl from "../BaseUrl";
import * as SecureStore from "expo-secure-store";

const FetchTransactions = async () => {
	const authToken = await SecureStore.getItemAsync("authToken");
	try {
		const response = await fetch(`${baseUrl}/transaction?page=1`, {
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

export default FetchTransactions;
