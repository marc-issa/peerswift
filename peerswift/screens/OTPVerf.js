import { useEffect, useState } from "react";

// Style imports
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Image, Text, TouchableOpacity } from "react-native";

// Component imports
import OtpInput from "../components/Inputs/OtpInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";

const OTPVerf = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [otp, setOtp] = useState([]);

	const [disabled, setDisabled] = useState(true);

	const handleOtpInput = (value) => {
		if (value === "<") {
			return setOtp(otp.slice(0, -1));
		}
		if (otp.length < 6) {
			return setOtp([...otp, value]);
		}
	};

	useEffect(() => {
		if (otp.length === 6) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [otp]);
	return (
		<View style={style.container}>
			<Image source={require("../assets/Logo/Logo - small.png")} />
			<Text style={style.description}>
				An OTP (One-Time Password) has been sent to +961 11-111-111 mobile
				number. Please enter the 6-digit code below to verify your account.
			</Text>
			<OtpInput otpCode={otp} onChange={handleOtpInput} />
			<View style={style.resendOTPContainer}>
				<Text style={style.resendOTP}>Didn't receive the OTP?</Text>
				<TouchableOpacity>
					<Text style={style.resendButtonText}> Resend OTP</Text>
				</TouchableOpacity>
			</View>

			<Buttons
				type={"primary"}
				screen={"PinVerf"}
				navigation={navigation}
				disabled={disabled}
				title={"Verify"}
			/>
			<DialPad onChange={handleOtpInput} />
		</View>
	);
};

export default OTPVerf;
