import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const Account = ({ account, value, onChange, onChangeType }) => {
	const theme = useTheme();
	const style = styles(theme);

	const handleAccountClick = (id) => {
		if (account.id === value) {
			onChange(null);
			onChangeType(null);
			return;
		}
		onChange(id);
		if (!account.balance) {
			onChangeType("card");
		} else {
			onChangeType("wallet");
		}
	};

	return (
		<TouchableOpacity
			style={[style.accountBox, { borderWidth: account.id === value ? 3 : 0 }]}
			onPress={() => handleAccountClick(account.id)}>
			<Text style={style.accountTitle}>
				{account.balance ? "Wallet" : "Visa"}
			</Text>
			<View style={style.accountInfo}>
				<Text style={style.accountInfoTitle}>
					{account.balance ? "Total Balance" : "Visa MasterCard"}
				</Text>
				<Text style={style.accountNumber}>
					{account.balance
						? account.balance
						: account.card_number &&
						  "**** **** **** " + account.card_number.slice(0, 4)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Account;
