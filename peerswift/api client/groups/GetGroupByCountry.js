import fetch from "node-fetch";
import baseUrl from "../BaseUrl";

const getGroupByCountry = async (country_id) => {
	const reqData = {
		country_id: country_id,
	};
	try {
		const response = await fetch(`${baseUrl}/groups/country`, {
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
			message: error.message || "An error occurred during fetching data.",
		};
	}
};

export default getGroupByCountry;
