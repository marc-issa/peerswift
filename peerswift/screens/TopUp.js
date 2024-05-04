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
import Buttons from "../components/Buttons";

// API import
import FetchSendSum from "../api client/send/FetchSendSum";
import PostDeposit from "../api client/Topup/PostDeposit";
import { useQuery } from "@tanstack/react-query";

const TopUp = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [selectedAccount, setSelectedAccount] = useState(null);
	const [accountType, setAccountType] = useState(null);
	const [amount, setAmount] = useState(0.0);

	const [wallet, setWallet] = useState([]);
	const [creditCards, setCreditCards] = useState([]);

	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const handleAccountClick = (account) => {
		setSelectedAccount(account);
	};

	const handleAccountType = (type) => {
		setAccountType(type);
	};

	const handleAmmountChange = (value) => {
		setAmount(value);
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
				setCreditCards(data.accounts.credit_cards);
			}
		}
	};

	useEffect(() => {
		handleData(data);
	}, [isPending]);

	// Handle Deposit
	const handleDeposit = () => {
		setLoading(true);
		const reqData = {
			amount: amount,
		};
		PostDeposit(reqData).then((data) => {
			if (data.status === "success") {
				setLoading(false);
				alert("Deposit successful");
				navigation.goBack();
			} else {
				setLoading(false);
				alert(data.message);
			}
		});
	};

	useEffect(() => {
		setDisabled(true);
		if (selectedAccount && amount !== 0) {
			setDisabled(false);
		}
	}, [selectedAccount, amount]);

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
						<Text style={style.headerTitle}>Top-up</Text>
						<View style={{ flex: 1 }}></View>
					</View>
					<View style={style.actionSection}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>Choose account</Text>
							<TouchableOpacity style={style.actionSectionbutton}>
								<Text style={style.actionButtonTxt}>+ Add</Text>
							</TouchableOpacity>
						</View>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							style={{ marginTop: 20, paddingBottom: 10 }}>
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
					<Buttons
						type={"primary"}
						screen={"SendMoney"}
						navigation={navigation}
						disabled={disabled}
						isPending={loading}
						title={"Deposit"}
						handleSubmit={handleDeposit}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default TopUp;
