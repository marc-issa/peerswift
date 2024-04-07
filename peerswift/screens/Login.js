import { styles } from "../styles";
import { useState } from "react";

import { useTheme } from "@react-navigation/native";

import { View, Image, Text } from "react-native";

import PhoneInput from "../components/PhoneInput";
import Buttons from "../components/Buttons";

const Login = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);
	const [phoneNumber, setPhoneNumber] = useState("");

	const handlePhoneInput = (value) => {
		setPhoneNumber(value);
	};

	return (
		<View style={style.container}>
			<Image source={require("../assets/Logo/Logo - small.png")} />
			<Text style={style.description}>
				Access global exchanges with PEERSIWFT! Log in or sign up using your
				phone number.
			</Text>
			<PhoneInput
				value={phoneNumber}
				onChange={handlePhoneInput}
				inputType={"phone-pad"}
			/>
			<Buttons type={"primary"} />
		</View>
	);
};
export default Login;
