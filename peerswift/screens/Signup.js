import { useEffect, useState } from "react";

import {
	Keyboard,
	View,
	Image,
	Text,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Component imports
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons";
import CalendarInput from "../components/Inputs/CalendarInput";

// Functions import
import isSameDay from "../functions/isSameDay";

const Signup = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [disabled, setDisabled] = useState(true);

	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [date, setDate] = useState(new Date());

	const handleFirstNameChange = (text) => {
		setFirstName(text);
	};

	const handleMiddleNameChange = (text) => {
		setMiddleName(text);
	};

	const handleLastNameChange = (text) => {
		setLastName(text);
	};

	const handleDateChange = (date) => {
		if (date < new Date()) {
			setDate(date);
		}
	};

	useEffect(() => {
		console.log(date, new Date());
		console.log(firstName, middleName, lastName, isSameDay(date, new Date()));
		if (firstName && lastName && middleName && !isSameDay(date, new Date())) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [firstName, middleName, lastName, date]);

	return (
		<KeyboardAvoidingView
			behavior={theme.os === "ios" ? "padding" : "height"}
			style={style.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View
						style={{
							alignItems: "center",
						}}>
						<Image source={require("../assets/Logo/Logo - small.png")} />

						<Text style={style.description}>
							Enter your accurate personal details below for account creation
							and personalized experiences. Your information is secure with us.
							Thank you for helping us enhance your experience.
						</Text>
						<Input
							title={"First Name"}
							value={firstName}
							onChange={handleFirstNameChange}
						/>
						<Input
							title={"Middle Name"}
							value={middleName}
							onChange={handleMiddleNameChange}
						/>
						<Input
							title={"Last Name"}
							value={lastName}
							onChange={handleLastNameChange}
						/>
						<CalendarInput
							isEmpty={true}
							value={date}
							onChange={handleDateChange}
						/>
						<Buttons
							type={"primary"}
							screen={"OTPVerf"}
							navigation={navigation}
							disabled={disabled}
							title={"Continue"}
						/>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Signup;
