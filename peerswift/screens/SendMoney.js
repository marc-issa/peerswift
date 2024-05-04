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
import ErrorComponent from "../components/ErrorComponent";

// API import
import FetchSendSum from "../api client/send/FetchSendSum";
import { useQuery } from "@tanstack/react-query";
import PostSend from "../api client/send/PostSend";

const SendMoney = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [selectedAccount, setSelectedAccount] = useState(null);
	const [accountType, setAccountType] = useState(null);

	const [amount, setAmount] = useState(0.0);
	const [recepient, setRecepient] = useState(null);

	const [wallet, setWallet] = useState([]);
	const [creditCards, setCreditCards] = useState([]);
	const [recepients, setRecepients] = useState([]);

	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

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

	// Functions
	const handleAccountClick = (account) => {
		setSelectedAccount(account);
	};

	const handleAccountType = (type) => {
		console.log(type);
		setAccountType(type);
	};

	const handleAmmountChange = (value) => {
		setAmount(value);
	};

	const handleRecepientChange = (value) => {
		setRecepient(value);
	};

	// API Calls
	// Fetch Summary
	const { isPending, data, error, refetch } = useQuery({
		queryKey: ["send summary"],
		queryFn: FetchSendSum,
	});

	const handleData = (data) => {
		setLoading(isPending);

		if (error) {
			console.log(error);
		}
		if (data) {
			if (data.accounts) {
				setWallet(data.accounts.wallet);
				setCreditCards(data.accounts.credit_cards);
			}
			if (data.contacts) {
				setRecepients(data.contacts);
			}
		}
	};

	useEffect(() => {
		handleData(data);
	}, [isPending]);

	// Send Money
	const handleSendMoney = () => {
		const reqData = {
			account_type: accountType,
			selected_account: selectedAccount,
			amount: amount,
			recepient_id: recepient.contact_user_id,
		};

		PostSend(reqData).then((data) => {
			if (data.status === "success") {
				alert("Money sent successfully");
				navigation.goBack();
			} else {
				setErrorMsg(data.message);
				handleError();
			}
		});
	};

	useEffect(() => {
		setDisabled(true);
		if (selectedAccount && amount !== 0 && recepient) {
			setDisabled(false);
		}
	}, [selectedAccount, amount, recepient]);

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
								onPress={() => navigation.navigate("AddCard")}>
								<Text style={style.actionButtonTxt}>+ Add</Text>
							</TouchableOpacity>
						</View>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							style={{ marginTop: 20, paddingBottom: 10 }}>
							{wallet ? (
								<Account
									key={wallet.id}
									account={wallet}
									value={selectedAccount}
									onChange={handleAccountClick}
									onChangeType={handleAccountType}
								/>
							) : null}
							{creditCards
								? creditCards.map((creditCard) => (
										<Account
											key={creditCard.id}
											account={creditCard}
											value={selectedAccount}
											onChange={handleAccountClick}
											onChangeType={handleAccountType}
										/>
								  ))
								: null}
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
								onPress={() => navigation.navigate("AddRecipient")}>
								<Text style={style.actionButtonTxt}>+ Add</Text>
							</TouchableOpacity>
						</View>
						<Recepients
							recepients={recepients}
							value={recepient}
							onChange={handleRecepientChange}
						/>
					</View>

					<Buttons
						type={"primary"}
						screen={"SendMoney"}
						navigation={navigation}
						disabled={disabled}
						isPending={loading}
						title={
							recepient ? `Send to ${recepient.contact.full_name}` : "Send"
						}
						handleSubmit={handleSendMoney}
					/>
					<ErrorComponent
						isVisible={modalVisible}
						message={errorMsg || "An error occurred"}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SendMoney;
