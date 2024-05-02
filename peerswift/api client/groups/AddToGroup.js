import fetch from "node-fetch";
import baseUrl from "../BaseUrl";
import * as SecureStore from "expo-secure-store";

const FetchRequests = async (country_id) => {
	const authToken = await SecureStore.getItemAsync("authToken");
	try {
		const response = await fetch(`${baseUrl}/groups/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + authToken,
			},
			body: JSON.stringify({ country_id: country_id }),
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

export default FetchRequests;
