import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { decode as base64decode } from "base-64";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);

	const setToken = async (token) => {
		await SecureStore.setItemAsync("authToken", token);
		setLoggedIn(true);
	};

	const removeToken = async () => {
		await SecureStore.deleteItemAsync("authToken");
		setLoggedIn(false);
	};

	const getToken = async () => {
		const token = await SecureStore.getItemAsync("authToken");
		global.atob = base64decode;

		if (token) {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			if (decodedToken.exp * 1000 < Date.now()) {
				removeToken();
			} else {
				setLoggedIn(true);
			}
		} else {
			setLoggedIn(false);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, login: setToken, logout: removeToken }}>
			{children}
		</AuthContext.Provider>
	);
};
