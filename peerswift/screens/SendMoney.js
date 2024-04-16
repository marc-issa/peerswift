// Import necessary dependencies from React and React Native
import { useState, useEffect } from "react";
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

// Components import
import Account from "../components/Account";
import AmountSelect from "../components/AmountSelect";
import Recepients from "../components/Recepients";
import Buttons from "../components/Buttons";

const SendMoney = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [selectedAccount, setSelectedAccount] = useState(null);
	const [amount, setAmount] = useState(0.0);
	const [recepient, setRecepient] = useState(null);

	const handleAccountClick = (account) => {
		setSelectedAccount(account);
	};

	const handleAmmountChange = (value) => {
		setAmount(value);
	};

	const handleRecepientChange = (value) => {
		setRecepient(value);
	};

	const accountData = [
		{
			account_id: 1,
			account_name: "Wallet",
			account_balance: 1000.0,
			currency: "USD",
			wallet: true,
		},
		{
			account_id: 2,
			account_name: "Visa",
			account_type: "MasterCard",
			account_number: "**** **** **** 1234",
			currency: "USD",
			wallet: false,
		},
	];

	const recepientsData = [
		{
			id: 1,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
		{
			id: 2,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
		{
			id: 13,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
		{
			id: 14,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
		{
			id: 15,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
		{
			id: 16,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
		{
			id: 17,
			name: "Will Adam",
			country_flag: "https://flagcdn.com/w320/cy.png",
			rating: 4.5,
		},
	];

	return (
		<KeyboardAvoidingView
			style={style.container}
			behavior={theme.os === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}>
				<ScrollView contentContainerStyle={{ flex: 1 }}>
					<View style={style.header}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Image
								source={require("../assets/Icons/back.png")}
								style={style.backButton}
							/>
						</TouchableOpacity>
						<Text style={style.headerTitle}>Send Money</Text>
						<View style={{ flex: 1 }}></View>
					</View>
					<View style={style.actionSection}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>Choose account</Text>
							<TouchableOpacity
								style={style.actionSectionbutton}
								onPress={() => navigation.navigate("AddRecipient")}>
								<Text style={style.actionButtonTxt}>+ Add</Text>
							</TouchableOpacity>
						</View>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							style={{ marginTop: 20, paddingBottom: 10 }}>
							{accountData.map((account) => (
								<Account
									key={account.account_id}
									account={account}
									value={selectedAccount}
									onChange={handleAccountClick}
								/>
							))}
						</ScrollView>
					</View>
					<View style={style.actionSection}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>
								How much would you like to send?
							</Text>
						</View>
						<AmountSelect value={amount} onChange={handleAmmountChange} />
					</View>
					<View style={[style.actionSection, { borderBottomWidth: 0 }]}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>Choose a Recipient</Text>
							<TouchableOpacity
								style={style.actionSectionbutton}
								onPress={() => navigation.navigate("AddCard")}>
								<Text style={style.actionButtonTxt}>+ Add</Text>
							</TouchableOpacity>
						</View>
						<Recepients
							recepients={recepientsData}
							value={recepient}
							onChange={handleRecepientChange}
						/>
					</View>

					<Buttons
						type={"primary"}
						screen={"SendMoney"}
						navData={{}}
						navigation={navigation}
						disabled={true}
						title={"Send to Will Adam"}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SendMoney;
