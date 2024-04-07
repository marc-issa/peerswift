import { useEffect, useState } from "react";

// API imports
import { useQuery } from "@tanstack/react-query";
import getCountries from "../api client/getCountries";

// Style imports
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Image, Text } from "react-native";

// Component imports
import PhoneInput from "../components/PhoneInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";

// Functions
import searchCountry from "../functions/searchCountry";

const Login = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [phoneNumber, setPhoneNumber] = useState("");

	const [disabled, setDisabled] = useState(true);

	const [countries, setCountries] = useState([]);
	const [flag, setFlag] = useState("");

	// API Calls
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
				setFlag(country.country_flag);
			}
		}
	}, [countries]);

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
			<PhoneInput value={phoneNumber} onChange={handlePhoneInput} flag={flag} />
			<Buttons
				type={"primary"}
				screen={"OTPVerf"}
				navigation={navigation}
				disabled={disabled}
			/>
			<DialPad onChange={handlePhoneInput} />
		</View>
	);
};
export default Login;
