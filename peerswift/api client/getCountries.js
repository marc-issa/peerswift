import fetch from "node-fetch";
import baseUrl from "./BaseUrl";

const getCountries = async () => {
	try {
		const response = await fetch(`${baseUrl}/countries`);
		const data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
};

export default getCountries;
