import { useState, useEffect } from "react";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity } from "react-native";

import DialPad from "../components/DialPad";
import PinInput from "../components/Inputs/PinInput";

const PinVerf = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [pin, setPin] = useState([]);

	const handlePinInput = (value) => {
		if (value === "<") {
			return setPin(pin.slice(0, -1));
		}
		if (pin.length < 6) {
			return setPin([...pin, value]);
		}
	};

	useEffect(() => {
		if (pin.length === 6) {
			console.log("redirecting to home");
		}
	}, [pin]);

	return (
		<View style={style.container}>
			<Image source={require("../assets/Logo/Logo - small.png")} />

			<Text style={style.description}>
				Please enter your 4-digit PIN to access your account.
			</Text>
			<Text
				style={[
					style.errorTxt,
					{ marginTop: theme.dimensions.height * 0.02 },
				]}></Text>
			<PinInput pinCode={pin} />
			<View style={style.forgotPassContainer}>
				<Text style={style.forgotPass}>
					If you've forgotten your PIN, you can reset it by verifying your
					identity.
					<TouchableOpacity style={style.forgotPassButton}>
						<Text style={style.forgotPassText}> Forgot PIN?</Text>
					</TouchableOpacity>
				</Text>
			</View>
			<DialPad onChange={handlePinInput} />
		</View>
	);
};

export default PinVerf;
