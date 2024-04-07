import { useState } from "react";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Image, Text } from "react-native";

// Component imports
import PhoneInput from "../components/PhoneInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";

const Login = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);
	const [phoneNumber, setPhoneNumber] = useState("");

	const handlePhoneInput = (value) => {
		if (value === "<") {
			return setPhoneNumber(phoneNumber.slice(0, -1));
		}
		setPhoneNumber(phoneNumber + value);
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
			<DialPad onChange={handlePhoneInput} />
		</View>
	);
};
export default Login;
