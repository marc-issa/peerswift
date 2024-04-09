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
		header: {
			color: theme.colors.accent,
			marginTop: theme.dimensions.height * 0.02,
			width: theme.dimensions.width * 0.9,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		headerTitle: {
			fontSize: 24,
			color: theme.colors.accent,
			fontWeight: "bold",
			textAlign: "center",
			flex: 10,
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
		// Pin Input
		pinInpContainer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: theme.dimensions.width * 0.8,

			marginTop: theme.dimensions.height * 0.01,
			marginBottom: theme.dimensions.height * 0.035,
		},
		pinInpBox: {
			width: theme.dimensions.width * 0.07,
			height: theme.dimensions.width * 0.07,
			borderWidth: 1,
			borderColor: theme.colors.primary,
			borderWidth: 1.5,
			textAlign: "center",
			margin: 5,
			borderRadius: 100,
			fontSize: 20,
			color: theme.colors.accent,
		},
		pinInpBoxFill: {
			width: theme.dimensions.width * 0.07,
			height: theme.dimensions.width * 0.07,
			borderWidth: 1,
			borderColor: theme.colors.primary,
			borderWidth: 2,
			textAlign: "center",
			margin: 5,
			borderRadius: 100,
			fontSize: 20,
			color: theme.colors.accent,
			backgroundColor: theme.colors.primary,
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
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
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

		// ********** Pin Verf **********
		forgotPassContainer: {
			width: theme.dimensions.width * 0.9,
			marginTop: theme.dimensions.height * 0.02,
		},
		forgotPass: {
			color: theme.colors.accent,
			fontSize: 16,
			textAlign: "center",
		},
		forgotPassText: {
			color: theme.colors.primary,
			fontSize: 16,
			fontWeight: "bold",
		},
		forgotPassButton: {},

		// ********** Home **********
		homeHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: theme.dimensions.width * 0.9,
			marginTop: theme.dimensions.height * 0.02,
		},
		BalanceDisp: {
			width: theme.dimensions.width * 0.9,
			marginTop: theme.dimensions.height * 0.02,
		},
		homeTxt: {
			color: theme.colors.accent,
			fontSize: 16,
		},
		linkTxt: {
			color: theme.colors.primary,
			fontSize: 16,
			textDecorationLine: "underline",
		},
		balanceTxt: {
			color: theme.colors.primary,
			fontSize: 38,
			fontWeight: "bold",
			marginTop: theme.dimensions.height * 0.01,
		},
		homeFunc: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: theme.dimensions.width * 0.9,
			paddingVertical: theme.dimensions.height * 0.02,
		},
		stats: {
			flex: 1,
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "center",
			height: theme.dimensions.height * 0.21,
		},
		statsBox: {
			width: "100%",
			height: theme.dimensions.height * 0.08,
			borderRadius: 10,
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 5,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
		},
		statsTxtS: {
			color: theme.colors.background,
			fontSize: 16,
		},
		statsTxtL: {
			color: theme.colors.background,
			fontSize: 28,
			fontWeight: "bold",
		},
		navs: {
			flex: 1.8,
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "center",
			flexWrap: "wrap",
			height: theme.dimensions.height * 0.21,
		},
		navButton: {
			alignItems: "center",
			marginLeft: 8,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
		},
		navBox: {
			width: theme.dimensions.width * 0.17,
			height: theme.dimensions.width * 0.17,
			borderRadius: 10,
			marginVertical: 5,
			backgroundColor: theme.colors.primary,
			justifyContent: "center",
			alignItems: "center",
		},
		navIcon: {
			width: theme.dimensions.width * 0.1,
			height: theme.dimensions.width * 0.09,
		},
		recentContainer: {
			width: theme.dimensions.width * 0.9,
			marginTop: theme.dimensions.height * 0.02,
		},
		recentHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		// ********** Activities Card **********
		cardAct: {
			width: theme.dimensions.width * 0.55,
			height: theme.dimensions.width * 0.4,
			marginRight: 10,
			borderRadius: 10,
			backgroundColor: "#F6F6F6",
			flexDirection: "column",
			justifyContent: "space-between",
			marginTop: 5,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
		},
		cardHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
		cardActFlag: {
			width: theme.dimensions.width * 0.1,
			height: theme.dimensions.width * 0.1,
			marginRight: 5,
			borderRadius: 100,
		},
		cardActTitle: {
			color: theme.colors.accent,
			fontSize: 16,
		},
		cardActRating: {
			color: theme.colors.accent,
			fontSize: 16,
		},
		cardMid: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: 10,
			marginBottom: 20,
		},
		cardCurrency: {
			color: theme.colors.accent,
			fontSize: 25,
			fontWeight: "bold",
			marginRight: 5,
		},
		cardAmount: {
			color: theme.colors.accent,
			fontSize: 28,
			fontWeight: "bold",
		},
		cardFooter: {
			borderBottomLeftRadius: 10,
			borderBottomRightRadius: 10,
			paddingHorizontal: 5,
			paddingVertical: 5,
			alignItems: "flex-end",
		},
		cardAction: {
			color: theme.colors.background,
			fontSize: 16,
			fontWeight: "bold",
		},
		cardActLong: {
			width: theme.dimensions.width * 0.9,
			borderRadius: 10,
			backgroundColor: "#F6F6F6",
			flexDirection: "row",
			justifyContent: "space-between",
			marginVertical: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
		},
		cardCurerncyLong: {
			fontSize: 18,
			color: theme.colors.accent,
			fontWeight: "bold",
			marginRight: 5,
		},
		cardAmountLong: {
			fontSize: 19,
			color: theme.colors.accent,
			fontWeight: "bold",
		},
		cardActFlagLong: {
			width: theme.dimensions.width * 0.075,
			height: theme.dimensions.width * 0.075,
			marginRight: 5,
			borderRadius: 100,
		},
		cardFooterLong: {
			width: theme.dimensions.width * 0.3,
			borderBottomRightRadius: 10,
			borderTopLeftRadius: 10,
			paddingHorizontal: 5,
			paddingVertical: 5,
			alignItems: "flex-end",
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
		// ********** Activities Filter **********
		filterDesign: {
			width: theme.dimensions.width * 0.9,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginTop: theme.dimensions.height * 0.02,
			paddingBottom: 10,
		},
		filterBox: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#F6F6F6",
			borderRadius: 100,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
		},
		filterIndvBox: {
			paddingHorizontal: 15,
			paddingVertical: 10,
			borderRadius: 100,
		},
		filterTxt: {
			color: theme.colors.primary,
			fontSize: 16,
			fontWeight: "bold",
		},
		listContainer: {
			width: theme.dimensions.width,
			marginTop: theme.dimensions.height * 0.02,
			paddingVertical: 10,
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "center",
		},
		// ********** Errors **********
		errorTxt: {
			color: "#D05353",
			fontSize: 16,
		},
		// ********** Icons **********
		icon: {
			width: 36,
			height: 36,
		},
		backButton: {
			width: 40,
			height: 40,
		},
	});
