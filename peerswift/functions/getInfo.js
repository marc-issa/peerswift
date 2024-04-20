import * as SecureStore from "expo-secure-store";

const getInfo = async (data) => {
	const token = await SecureStore.getItemAsync(data);
	const decodedToken = JSON.parse(atob(token.split(".")[1]));
	return decodedToken;
};

export default getInfo;
