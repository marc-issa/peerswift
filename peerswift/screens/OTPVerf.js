import { useEffect, useState } from "react";

// Style imports
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Image, Text, TouchableOpacity } from "react-native";

// Context imports
import { useAuth } from "../routes/AuthProvider";

// Component imports
import OtpInput from "../components/Inputs/OtpInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";

// APIs import
import PostOTP from "../api client/Auth/PostOTP";

const OTPVerf = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);
	const { login } = useAuth();

	const [otp, setOtp] = useState([]);

	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);

	const handleOtpInput = (value) => {
		if (value === "<") {
			return setOtp(otp.slice(0, -1));
		}
		if (otp.length < 6) {
			return setOtp([...otp, value]);
		}
	};

	const handleResendOTP = () => {
		console.log("Resend OTP");
	};

	const handleSubmit = () => {
		setLoading(true);
		PostOTP({ phone_number: phoneNumber, otp: otp.join("") })
			.then((data) => {
				if (data.message === "Phone number verified successfully") {
					setLoading(false);
					login(data.jwt);
				} else {
					setLoading(false);
					console.log(data.message);
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
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
				An OTP (One-Time Password) has been sent to {phoneNumber} mobile number.
				Please enter the 6-digit code below to verify your account.
			</Text>
			<OtpInput otpCode={otp} onChange={handleOtpInput} />
			<View style={style.resendOTPContainer}>
				<Text style={style.resendOTP}>Didn't receive the OTP?</Text>
				<TouchableOpacity onPress={handleResendOTP}>
					<Text style={style.resendButtonText}> Resend OTP</Text>
				</TouchableOpacity>
			</View>

			<Buttons
				type={"primary"}
				screen={"PinVerf"}
				disabled={disabled}
				title={"Verify"}
				isPending={loading}
				handleSubmit={handleSubmit}
			/>
			<DialPad onChange={handleOtpInput} />
		</View>
	);
};

export default OTPVerf;
