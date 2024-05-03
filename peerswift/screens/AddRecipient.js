import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { useEffect, useState } from "react";

// API imports
import { useQuery } from "@tanstack/react-query";
import getCountries from "../api client/countries/getCountries";
import FetchUser from "../api client/User/FetchUser";
import AddContact from "../api client/User/AddContact";

// Component imports
import PhoneInput from "../components/Inputs/PhoneInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";
import ErrorComponent from "../components/ErrorComponent";

// Functions
import searchCountry from "../functions/searchCountry";

const AddRecipient = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [phoneNumber, setPhoneNumber] = useState("");

	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(false);

	const [countries, setCountries] = useState([]);
	const [countryCode, setCountryCode] = useState([]);
	const [flag, setFlag] = useState("");

	const [recipient, setRecipient] = useState({});

	// Error handling
	const [modalVisible, setModalVisible] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

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
			setSelected(false);
			setRecipient({});
		}
	}, [phoneNumber]);

	const handleSubmit = () => {
		setLoading(true);
		if (selected) {
			const data = {
				user_id: recipient.id,
			};
			AddContact(data).then((response) => {
				if (response.status === "success") {
					navigation.goBack();
				} else {
					setErrorMsg(response.message);
					handleError();
				}
			});
		} else {
			const data = {
				phone_number: countryCode + phoneNumber,
			};
			FetchUser(data).then((response) => {
				if (response.status === "success") {
					setRecipient(response.user);
					setSelected(true);
				} else {
					setErrorMsg(response.message);
					handleError();
				}
			});
		}
		setLoading(false);
	};

	return (
		<ScrollView>
			<View style={style.container}>
				<View style={style.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Image
							source={require("../assets/Icons/back.png")}
							style={style.backButton}
						/>
					</TouchableOpacity>
					<Text style={style.headerTitle}>Add New Recipient</Text>
					<View style={{ flex: 1 }}></View>
				</View>
				<Text style={style.description}>
					Easily add your friends or family as recipients to share transactions
					instantly. Simply enter their phone number below, and if they're
					already using our app, we'll add them to your recipient list.
				</Text>
				<View style={style.addedRecpBox}>
					{recipient.country ? (
						<Image
							source={{ uri: recipient.country.flag }}
							style={style.recepientFlag}
						/>
					) : (
						<></>
					)}
					<Text style={style.recepientTitle}>
						{recipient ? recipient.full_name : ""}
					</Text>
				</View>
				<PhoneInput
					value={phoneNumber}
					onChange={handlePhoneInput}
					flag={flag}
				/>
				<Buttons
					type={"primary"}
					screen={""}
					navigation={navigation}
					disabled={disabled}
					title={selected ? "Add" : "Search"}
					isPending={loading}
					handleSubmit={handleSubmit}
				/>
				<DialPad onChange={handlePhoneInput} />
				<ErrorComponent
					isVisible={modalVisible}
					message={errorMsg || "An error occurred"}
				/>
			</View>
		</ScrollView>
	);
};

export default AddRecipient;
