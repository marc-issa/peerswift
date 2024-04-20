import fetch from "node-fetch";
import baseUrl from "../BaseUrl";
import * as SecureStore from "expo-secure-store";

const UpdatePin = async (pin) => {
	const authToken = await SecureStore.getItemAsync("authToken");
	try {
		const response = await fetch(`${baseUrl}/auth/pin-insert`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + authToken,
			},
			body: JSON.stringify(pin),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message || "An error occurred during signup",
		};
	}
};

export default UpdatePin;
