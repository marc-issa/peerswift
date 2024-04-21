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
import ErrorComponent from "../components/ErrorComponent";

// Functions import
import isSameDay from "../functions/isSameDay";

// API imports
import PostUser from "../api client/Auth/PostUser";
import getGroupByCountry from "../api client/groups/GetGroupByCountry";

const Signup = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [date, setDate] = useState(new Date());
	const [groupId, setGroupId] = useState("");

	const [countryId, setCountryId] = useState(route.params.countryId);

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
	// Get group by country
	useEffect(() => {
		getGroupByCountry(countryId)
			.then((data) => {
				setGroupId(data.data[0].id);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [countryId]);

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
		if (firstName && lastName && middleName && !isSameDay(date, new Date())) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [firstName, middleName, lastName, date]);

	// Post User Info
	const handleSubmit = async () => {
		const data = {
			phone_number: phoneNumber,
			full_name: firstName + " " + lastName,
			mid_name: middleName,
			dob: date,
			country_id: countryId,
			group_id: groupId,
		};
		const result = await PostUser(data);
		console.log(result);
		if (result.status === "success") {
			navigation.replace("OTPVerf", { phoneNumber: phoneNumber });
		} else {
			handleError();
		}
	};

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
							screen={"PinVerf"}
							disabled={disabled}
							title={"Continue"}
							isPending={loading}
							handleSubmit={handleSubmit}
						/>
						<ErrorComponent
							isVisible={modalVisible}
							message={"An error occurred"}
						/>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Signup;
