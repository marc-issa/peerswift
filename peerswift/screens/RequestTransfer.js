import { useState, useEffect } from "react";

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Touchable,
} from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import AmountSelect from "../components/AmountSelect";
import Buttons from "../components/Buttons";
import ErrorComponent from "../components/ErrorComponent";

// SecureStore import
import * as SecureStore from "expo-secure-store";

// API client import
import PostRequest from "../api client/requests/PostRequest";

const RequestTransfer = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [amount, setAmount] = useState(0.0);
	const [country, setCountry] = useState("");

	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

	// Error handling
	const [modalVisible, setModalVisible] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleError = () => {
		setModalVisible(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setModalVisible(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [modalVisible]);

	// Functions
	const handleAmmountChange = (value) => {
		setAmount(value);
	};

	const getCountry = async () => {
		const storedCountry = await SecureStore.getItemAsync("requestCountry");
		if (storedCountry) {
			const parsedCountry = JSON.parse(storedCountry);
			setCountry(parsedCountry);
		}
	};

	useEffect(() => {
		getCountry();
	}, [country, amount]);

	const clearCountry = async () => {
		await SecureStore.deleteItemAsync("requestCountry");
	};

	useEffect(() => {
		if (amount > 0 && country) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [amount, country]);

	const handleSubmit = () => {
		setLoading(true);
		const reqData = {
			amount: amount,
			country: country.id,
		};
		PostRequest(reqData)
			.then((res) => {
				if (res.status === "success") {
					clearCountry();
					alert("Request sent successfully");
					navigation.goBack();
				} else {
					setErrorMsg(res.message);
					handleError();
				}
			})
			.catch((error) => {
				setErrorMsg("An error occurred");
				handleError();
			});
		setLoading(false);
	};

	return (
		<KeyboardAvoidingView
			style={style.container}
			behavior={theme.os === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}>
				<ScrollView contentContainerStyle={{ flex: 1 }}>
					<View style={style.header}>
						<TouchableOpacity
							onPress={() => {
								clearCountry();
								navigation.goBack();
							}}>
							<Image
								source={require("../assets/Icons/back.png")}
								style={style.backButton}
							/>
						</TouchableOpacity>
						<Text style={style.headerTitle}>Request</Text>
						<View style={{ flex: 1 }}></View>
					</View>
					<View style={style.actionSection}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>
								Choose destination country
							</Text>
						</View>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Countries", { type: "request" })
							}
							style={style.countriesButtonBox}>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								{country ? (
									<Image
										source={{ uri: country.flag }}
										style={{
											width: 40,
											height: 40,
											borderRadius: 100,
											marginRight: 10,
										}}
									/>
								) : null}
								<Text style={style.countriesButtonTitle}>
									{country ? country.name : "Select country"}
								</Text>
							</View>
							<Image
								source={require("../assets/Icons/chevron.png")}
								style={style.countriesButtonIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={[style.actionSection, { borderBottomWidth: 0 }]}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>
								How much would you like to send?
							</Text>
						</View>
						<AmountSelect value={amount} onChange={handleAmmountChange} />
					</View>
					<Buttons
						type={"primary"}
						screen={"SendMoney"}
						disabled={disabled}
						title={"Send request"}
						handleSubmit={handleSubmit}
						isPending={loading}
					/>
					<ErrorComponent
						isVisible={modalVisible}
						message={errorMsg || "An error occurred"}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default RequestTransfer;
