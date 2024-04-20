import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { useEffect, useState } from "react";

// API imports
import { useQuery } from "@tanstack/react-query";
import getCountries from "../api client/countries/getCountries";

// Component imports
import PhoneInput from "../components/Inputs/PhoneInput";
import Buttons from "../components/Buttons";
import DialPad from "../components/DialPad";

// Functions
import searchCountry from "../functions/searchCountry";

const AddRecipient = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [phoneNumber, setPhoneNumber] = useState("");

	const [disabled, setDisabled] = useState(true);

	const [countries, setCountries] = useState([]);
	const [countryCode, setCountryCode] = useState([]);
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
				setCountryCode(country.country_code);
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
				<PhoneInput
					value={phoneNumber}
					onChange={handlePhoneInput}
					flag={flag}
				/>
				<Buttons
					type={"primary"}
					screen={""}
					navData={{}}
					navigation={navigation}
					disabled={disabled}
					title={"Continue"}
				/>
				<DialPad onChange={handlePhoneInput} />
			</View>
		</ScrollView>
	);
};

export default AddRecipient;
