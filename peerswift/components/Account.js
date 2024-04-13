import { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Touchable,
} from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const Account = ({ account }) => {
	const theme = useTheme();
	const style = styles(theme);
	if (account.wallet) {
		return (
			<TouchableOpacity style={style.accountBox}>
				<Text style={style.accountTitle}>{account.account_name}</Text>
				<View style={style.accountInfo}>
					<Text style={style.accountInfoTitle}>Total Balance</Text>
					<Text style={style.accountBalance}>
						{account.currency}
						{account.account_balance}.00
					</Text>
				</View>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity style={style.accountBox}>
				<Text style={style.accountTitle}>{account.account_name}</Text>
				<View style={style.accountInfo}>
					<Text style={style.accountInfoTitle}>
						{account.account_name} {account.account_type}
					</Text>
					<Text style={style.accountNumber}>{account.account_number}</Text>
				</View>
			</TouchableOpacity>
		);
	}
};

export default Account;
