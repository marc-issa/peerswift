// React and React Native imports
import { useEffect, useState } from "react";
import { Dimensions, Platform, useColorScheme } from "react-native";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { useNavigationContainerRef } from "@react-navigation/native";
import StackNavigation from "./routes/StackNavigation";
import AuthStackNavigation from "./routes/AuthStackNavigation";

// SplashScreen imports
import * as SplashScreen from "expo-splash-screen";

// Theme imports
import { useFonts } from "expo-font";
import { DefaultTheme } from "react-native-paper";

// Context imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize SplashScreen to prevent auto hide
SplashScreen.preventAutoHideAsync();

// AuthProvider
import { AuthProvider, useAuth } from "./routes/AuthProvider";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

export default function AppWrapper() {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
}

function App() {
	// Theme setup
	const { width, height } = Dimensions.get("window");
	const colorScheme = useColorScheme();
	const lightTheme = {
		...DefaultTheme,
		colors: {
			primary: "#4573CF",
			secondary: "#648DD7",
			accent: "#313131",
			background: "#FCFCFC",
		},
		dark: false,
		dimensions: {
			width,
			height,
		},
		os: Platform.OS,
	};

	// Load fonts
	const [fontsLoaded, fontError] = useFonts({
		Poppins: require("./assets/Poppins/Poppins-Regular.ttf"),
	});

	if (fontError) {
		console.log(fontError);
	}

	// Use lightTheme as the themeColor
	const themeColor = lightTheme;

	// Reference for navigation
	const navigationRef = useNavigationContainerRef();
	const { isLoggedIn } = useAuth();

	// Hide SplashScreen once everything is loaded
	useEffect(() => {
		SplashScreen.hideAsync();
	}, [isLoggedIn]);

	return (
		<NavigationContainer ref={navigationRef} theme={themeColor}>
			<QueryClientProvider client={queryClient}>
				{isLoggedIn ? (
					<StackNavigation navigation={navigationRef} />
				) : (
					<AuthStackNavigation />
				)}
			</QueryClientProvider>
		</NavigationContainer>
	);
}
