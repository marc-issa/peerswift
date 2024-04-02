import { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		Poppins: require("./assets/Poppins/Poppins-Regular.ttf"),
	});

	if (fontsLoaded) {
		SplashScreen.hideAsync();
	} else {
		console.log(fontError);
	}

	return (
		<View>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
		</View>
	);
}
