import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { useEffect, useState } from "react";

// Component imports
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons";

// API imports
import PostCard from "../api client/User/PostCard";
import ErrorComponent from "../components/ErrorComponent";

function convertDate(inputDate) {
	// Split the inputDate into month and day parts
	const [month, day] = inputDate.split("/").map(Number);

	// Get the current year
	const currentYear = new Date().getFullYear();

	// Get the current century
	const currentCentury = Math.floor(currentYear / 100) * 100;

	// Determine if the date is in the future or the past
	const inputMonth = month < new Date().getMonth() + 1 ? month : month - 12;

	// Calculate the year based on the current year and the month provided
	const year =
		inputMonth > 0 ? currentYear + 100 - inputMonth : currentYear - inputMonth;

	// Create a new date with the calculated year and input month/day
	const newDate = new Date(year, month - 1, day);

	// Get the year, month, and day in the format YYYY-MM-DD
	const formattedYear = newDate.getFullYear();
	const formattedMonth = String(newDate.getMonth() + 1).padStart(2, "0");
	const formattedDay = String(newDate.getDate()).padStart(2, "0");

	// Return the formatted date
	return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

const AddRecipient = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvv, setCvv] = useState("");

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

	// Card number formatting
	const handleCardNumberChange = (text) => {
		let plainNumber = "";
		if (text.length !== 0) {
			plainNumber = text.replace(/\D/g, "");
		}

		if (plainNumber.length <= 16) {
			if (plainNumber.length === 0) {
				setCardNumber("");
				return;
			}
			const formattedNumber = plainNumber.match(/.{1,4}/g).join(" ");

			setCardNumber(formattedNumber);
		}
	};

	const handleCardNameChange = (text) => {
		setCardName(text);
	};

	const handleExpiryDateChange = (text) => {
		if (text.length <= 5) {
			if (text.length === 2 && expiryDate.length === 1) {
				text = text + "/";
			}
			setExpiryDate(text);
		}
	};

	const handleCvvChange = (text) => {
		if (text.length <= 3) {
			setCvv(text);
		}
	};

	useEffect(() => {
		if (
			cardNumber.length === 19 &&
			cardName.length >= 3 &&
			expiryDate.length === 5 &&
			cvv.length === 3
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [cardNumber, cardName, expiryDate, cvv]);

	const handleAddCard = () => {
		const reqData = {
			card_number: cardNumber,
			card_name: cardName,
			expiry_date: convertDate(expiryDate),
			cvv: cvv,
		};

		setLoading(true);
		PostCard(reqData)
			.then((data) => {
				if (data.status === "success") {
					alert("Card added successfully");
					navigation.goBack();
				} else {
					setErrorMsg(data.message);
					handleError();
				}
			})
			.catch((error) => {
				setErrorMsg(error.message);
				handleError();
			})
			.finally(() => setLoading(false));
		setLoading(false);
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
						<View style={style.header}>
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Image
									source={require("../assets/Icons/back.png")}
									style={style.backButton}
								/>
							</TouchableOpacity>
							<Text style={style.headerTitle}>Add New Card</Text>
							<View style={{ flex: 1 }}></View>
						</View>
						<View style={style.cardBox}>
							<Image source={require("../assets/Icons/visa-logo.png")} />
							<Text style={style.cardNumber}>
								{cardNumber.length >= 0 && cardNumber.length <= 15
									? "**** **** **** ****"
									: `**** **** **** ${cardNumber.substring(15)}`}
							</Text>
							<View style={style.cardInfo}>
								<View>
									<Text style={style.cardName}>Card Holder</Text>
									<Text style={style.cardName}>{cardName}</Text>
								</View>
								<View>
									<Text style={style.cardName}>Expiry Date</Text>
									<Text style={style.cardName}>{expiryDate}</Text>
								</View>
							</View>
						</View>
						<Input
							title={"Card Number"}
							value={cardNumber}
							onChange={handleCardNumberChange}
							keyboardType={"numeric"}
						/>
						<Input
							title={"Card Name"}
							value={cardName}
							onChange={handleCardNameChange}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								width: theme.dimensions.width * 0.9,
							}}>
							<Input
								title={"Expiry Date"}
								value={expiryDate}
								onChange={handleExpiryDateChange}
								keyboardType={"numeric"}
								type={"half"}
							/>
							<Input
								title={"CVV"}
								value={cvv}
								onChange={handleCvvChange}
								keyboardType={"numeric"}
								type={"half"}
							/>
						</View>
						<Buttons
							type={"primary"}
							screen={""}
							navData={{}}
							navigation={navigation}
							disabled={disabled}
							title={"Add Card"}
							isPending={loading}
							handleSubmit={handleAddCard}
						/>
						<ErrorComponent
							isVisible={modalVisible}
							message={errorMsg || "An error occurred"}
						/>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default AddRecipient;
