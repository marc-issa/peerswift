import { StyleSheet } from "react-native";

export const styles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "start",
			backgroundColor: theme.colors.background,
			paddingTop: theme.dimensions.height * 0.05,
		},
		description: {
			fontSize: 16,
			color: theme.colors.accent,
			textAlign: "center",
			marginTop: theme.dimensions.height * 0.02,
			width: theme.dimensions.width * 0.8,
		},
		// ********** Inputs **********
		// Phone input
		phoneInput: {
			flexDirection: "row",
			borderWidth: 1,
			borderColor: theme.colors.accent,
			width: theme.dimensions.width * 0.85,
			marginTop: theme.dimensions.height * 0.035,
			borderRadius: 5,
		},
		flagBox: {
			flex: 1,
			backgroundColor: theme.colors.background,
			borderTopLeftRadius: 5,
			borderBottomLeftRadius: 5,
			borderRightWidth: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		phoneFlag: {
			width: theme.dimensions.width * 0.1,
			height: theme.dimensions.height * 0.03,
		},
		// ********** Buttons **********
		// Global
		disabledButton: {
			opacity: 0.5,
		},
		// Primary button
		primaryButton: {
			backgroundColor: theme.colors.primary,
			width: theme.dimensions.width * 0.7,
			marginTop: theme.dimensions.height * 0.035,
			borderRadius: 5,
			paddingHorizontal: 10,
			paddingVertical: 15,
			alignItems: "center",
			justifyContent: "center",
		},
		primaryButtonTxt: {
			color: theme.colors.background,
			fontSize: 16,
			fontWeight: "bold",
		},
		// ********** DialPad **********
		buttonGrid: {
			flexDirection: "row",
			flexWrap: "wrap",
			width: theme.dimensions.width * 0.95,
			marginTop: theme.dimensions.height * 0.02,
			paddingHorizontal: theme.dimensions.width * 0.05,
		},
		dialButton: {
			width: theme.dimensions.width * 0.25,
			height: theme.dimensions.height * 0.11,
			margin: theme.dimensions.width * 0.01,
			borderRadius: 100,
			alignItems: "center",
			justifyContent: "center",
		},
		dialText: {
			color: theme.colors.accent,
			fontSize: 40,
		},
	});
