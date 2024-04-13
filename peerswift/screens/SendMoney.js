// Import necessary dependencies from React and React Native
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import Account from "../components/Account";

const SendMoney = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);
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
	return (
		<View style={style.container}>
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
					<TouchableOpacity>
						<Text style={style.actionSectionbutton}>+ Add</Text>
					</TouchableOpacity>
				</View>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={{ marginTop: 20 }}>
					{accountData.map((account) => (
						<Account key={account.account_id} account={account} />
					))}
				</ScrollView>
			</View>
		</View>
	);
};

export default SendMoney;
