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

// Functions
import searchCountry from "../functions/searchCountry";

const AddRecipient = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [disabled, setDisabled] = useState(true);

	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvv, setCvv] = useState("");

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
							disabled={true}
							title={"Add Card"}
						/>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default AddRecipient;
