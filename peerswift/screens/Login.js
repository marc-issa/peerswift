import { useEffect, useState } from "react";

// Style imports
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// API imports
import { useQuery } from "@tanstack/react-query";
import getCountries from "../api client/countries/getCountries";
import PostPhone from "../api client/Auth/PostPhone";

import { View, Image, Text } from "react-native";

// Component imports
import PhoneInput from "../components/Inputs/PhoneInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";
import ErrorComponent from "../components/ErrorComponent";

// Functions
import searchCountry from "../functions/searchCountry";

const Login = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [phoneNumber, setPhoneNumber] = useState("");

	const [disabled, setDisabled] = useState(true);

	const [countries, setCountries] = useState([]);
	const [countryCode, setCountryCode] = useState([]);
	const [flag, setFlag] = useState("");
	const [countryId, setCountryId] = useState("");

	const [loading, setLoading] = useState(false);

	// Error handling
	const [modalVisible, setModalVisible] = useState(false);

	const handleError = () => {
		setModalVisible(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setModalVisible(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [modalVisible]);

	// API Calls
	// Get countries
	const { isPending, data, error } = useQuery({
		queryKey: ["countries"],
		queryFn: getCountries,
	});

	useEffect(() => {
		if (error) {
			console.log(error);
		}
		if (data) {
			setCountries(data.data);
		}
	}, [isPending]);

	useEffect(() => {
		if (isPending) return;
		if (countries) {
			const country = searchCountry(countries, "Lebanon");
			if (country) {
				setFlag(country.flag);
				setCountryCode(country.code);
				setCountryId(country.id);
			}
		}
	}, [countries]);

	// Post phone number
	const handleSubmit = async () => {
		setLoading(true);
		const fullPhoneNumber = countryCode + phoneNumber;
		const result = await PostPhone(fullPhoneNumber);
		if (result.status === "success") {
			navigation.replace("OTPVerf", { phoneNumber: fullPhoneNumber });
		} else {
			if (result.message === "User not found") {
				navigation.navigate("Signup", {
					phoneNumber: fullPhoneNumber,
					countryId: countryId,
				});
			} else if (result.message === "OTP sent successfully") {
				navigation.replace("OTPVerf", { phoneNumber: fullPhoneNumber });
			} else {
				handleError();
			}
		}
		setLoading(false);
	};

	// Handlers
	const handlePhoneInput = (value) => {
		if (value === "<") {
			return setPhoneNumber(phoneNumber.slice(0, -1));
		}
		setPhoneNumber(phoneNumber + value);
	};

	useEffect(() => {
		if (phoneNumber.length >= 8) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [phoneNumber]);

	return (
		<View style={style.container}>
			<Image source={require("../assets/Logo/Logo - small.png")} />
			<Text style={style.description}>
				Access global exchanges with PEERSIWFT! Log in or sign up using your
				phone number.
			</Text>
			<PhoneInput
				navigation={navigation}
				value={phoneNumber}
				onChange={handlePhoneInput}
				flag={flag}
			/>
			<Buttons
				type={"primary"}
				screen={"OTPVerf"}
				disabled={disabled}
				title={"Continue"}
				isPending={loading}
				handleSubmit={handleSubmit}
			/>
			<DialPad onChange={handlePhoneInput} isPending={loading} />
			<ErrorComponent isVisible={modalVisible} message={"An error occurred"} />
		</View>
	);
};
export default Login;
