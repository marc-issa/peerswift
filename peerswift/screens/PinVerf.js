import { useState, useEffect } from "react";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity } from "react-native";

// Component import
import DialPad from "../components/DialPad";
import PinInput from "../components/Inputs/PinInput";

// Function import
import getInfo from "../functions/getInfo";

// APIs import
import UpdatePin from "../api client/Auth/UpdatePin";
import PinAccess from "../api client/Auth/PinAccess";

const PinVerf = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [pin, setPin] = useState([]);

	const [isFirstTime, setIsFirstTime] = useState(false);

	useEffect(() => {
		getInfo("authToken").then((data) => {
			if (data && data.pin) {
				setIsFirstTime(false);
			} else {
				setIsFirstTime(true);
			}
		});
	}, []);

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
			if (isFirstTime) {
				const newPin = pin.join("");
				UpdatePin({ pin: newPin }).then((data) => {
					if (data.status === "success") {
						navigation.replace("PinVerf");
					} else {
						console.log(data.message);
					}
				});
			} else {
				const newPin = pin.join("");
				PinAccess({ pin: newPin }).then((data) => {
					if (data.status === "success") {
						navigation.replace("Home");
					} else {
						console.log(data.message);
					}
				});
			}
		}
	}, [pin]);

	return (
		<View style={style.container}>
			<Image source={require("../assets/Logo/Logo - small.png")} />

			<Text style={style.description}>
				{isFirstTime
					? "Please enter a 6-digit PIN to access your account securely in the future"
					: "Please enter your 6-digit PIN to access your account."}
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
					<TouchableOpacity
						style={style.forgotPassButton}
						disabled={!isFirstTime}>
						<Text style={style.forgotPassText}>
							{isFirstTime ? "" : "Forgot Pin?"}
						</Text>
					</TouchableOpacity>
				</Text>
			</View>
			<DialPad onChange={handlePinInput} />
		</View>
	);
};

export default PinVerf;
