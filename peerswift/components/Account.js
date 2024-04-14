import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const Account = ({ account, value, onChange }) => {
	const theme = useTheme();
	const style = styles(theme);

	const handleAccountClick = (id) => {
		if (account.account_id === value) {
			onChange(null);
			return;
		}
		onChange(id);
	};

	if (account.wallet) {
		return (
			<TouchableOpacity
				style={[
					style.accountBox,
					{ borderWidth: account.account_id === value ? 3 : 0 },
				]}
				onPress={() => handleAccountClick(account.account_id)}>
				<Text style={style.accountTitle}>{account.account_name}</Text>
				<View style={style.accountInfo}>
					<Text style={style.accountInfoTitle}>Total Balance</Text>
					<Text style={style.accountBalance}>
						{account.currency} {account.account_balance}.00
					</Text>
				</View>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity
				style={[
					style.accountBox,
					{ borderWidth: account.account_id === value ? 3 : 0 },
				]}
				onPress={() => handleAccountClick(account.account_id)}>
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
