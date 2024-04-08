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
		// Global
		input: {
			flexDirection: "row",
			borderWidth: 1,
			borderColor: theme.colors.accent,
			width: theme.dimensions.width * 0.85,
			height: theme.dimensions.height * 0.06,
			marginTop: theme.dimensions.height * 0.035,
			borderRadius: 5,
		},
		// Phone input
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
		// OTP input
		otpContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: theme.dimensions.height * 0.03,
			width: theme.dimensions.width * 0.9,
		},
		otpBox: {
			width: 50,
			height: 50,
			borderWidth: 1,
			borderColor: theme.colors.border,
			textAlign: "center",
			margin: 5,
			borderRadius: 10,
			fontSize: 20,
			color: theme.colors.accent,
		},
		// Calendar input
		dateInput: {
			flexDirection: "row",
			borderWidth: 1,
			borderColor: theme.colors.accent,
			width: theme.dimensions.width * 0.85,
			height: theme.dimensions.height * 0.06,
			marginTop: theme.dimensions.height * 0.035,
			paddingLeft: theme.dimensions.width * 0.07,
			borderRadius: 5,
			alignItems: "center",
		},
		dateText: {
			color: theme.colors.accent,
			fontSize: 16,
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
		// ********** OTP Verf **********
		resendOTPContainer: {
			flexDirection: "row",
			justifyContent: "flex-end",
			alignItems: "flex-end",
			width: theme.dimensions.width * 0.9,
			height: theme.dimensions.height * 0.04,
		},
		resendOTP: {
			color: theme.colors.accent,
			fontSize: 15,
			marginTop: theme.dimensions.height * 0.02,
		},
		resendButtonText: {
			color: theme.colors.primary,
			fontSize: 15,
			fontWeight: "bold",
		},

		// ********** Calendar Modal **********
		datePickerModal: {
			position: "absolute",
			bottom: 0,
			height: theme.dimensions.height * 0.32,
			justifyContent: "flex-end",
			backgroundColor: theme.colors.background,
			opacity: 1,
		},
		datePickerContainer: {
			padding: 20,
			borderTopLeftRadius: 20,
			borderTopRightRadius: 20,
		},
	});
