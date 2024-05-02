import fetch from "node-fetch";
import baseUrl from "../BaseUrl";
import * as SecureStore from "expo-secure-store";

const FetchRequests = async (group_id, message) => {
	const authToken = await SecureStore.getItemAsync("authToken");
	const dataMessage = {
		group_id: group_id,
		message: message,
	};
	try {
		const response = await fetch(`${baseUrl}/groups/messages/send`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + authToken,
			},
			body: JSON.stringify(dataMessage),
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
