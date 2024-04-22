import React, { useState, useEffect } from "react";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import * as SecureStore from "expo-secure-store";
import { decode as base64decode } from "base-64";

const EditProfile = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [user, setUser] = useState({});

	const getUser = async () => {
		const token = await SecureStore.getItemAsync("authToken");
		global.atob = base64decode;

		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		return decodedToken;
	};

	useEffect(() => {
		getUser().then((user) => {
			setUser(user);
		});
	}, []);

	const profileField = (title) => {
		return (
			<View style={[style.profileItem, { marginTop: 10, paddingVertical: 15 }]}>
				<Text style={style.profileItemText}>{title}</Text>
			</View>
		);
	};

	function formatDate(date) {
		let day = date.getDate();
		let month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
		let year = date.getFullYear();

		// Add leading zero to day and month if they are less than 10
		day = day < 10 ? "0" + day : day;
		month = month < 10 ? "0" + month : month;

		return `${day}/${month}/${year}`;
	}

	function formatPhone(phone) {
		if (!phone) return phone;
		// Format phone number as +XXX XX XXX XXX or +XXX-XX-XXX-XXX
		// Remove all non-digit characters
		phone = phone.replace(/\D/g, "");

		// Check if phone number is 10 digits
		if (phone.length === 10) {
			// Format phone number as +XXX XX XXX XXX
			phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "+$1 $2 $3");
		} else {
			// Format phone number as +XXX-XX-XXX-XXX
			phone = phone.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
		}

		return phone;
	}
	return (
		<View style={style.container}>
			<View style={style.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/Icons/back.png")}
						style={style.backButton}
					/>
				</TouchableOpacity>
				<View style={style.profileHeader}>
					<View style={{ flex: 1 }}></View>
					<Text style={style.profileName}>Profile</Text>
					<View style={{ flex: 1 }}></View>
				</View>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView
				style={{ width: theme.dimensions.width * 0.9, paddingTop: 20 }}>
				<Text style={[style.profileSection, { marginTop: 10 }]}>
					Phone Number
				</Text>
				{profileField(formatPhone(user.phone_number))}
				<Text style={[style.profileSection, { marginTop: 20 }]}>Full Name</Text>
				{profileField(user.full_name)}
				<Text style={[style.profileSection, { marginTop: 20 }]}>
					Middle Name
				</Text>
				{profileField(user.mid)}
				<Text style={[style.profileSection, { marginTop: 20 }]}>
					Date of Birth
				</Text>
				{profileField(formatDate(new Date(user.dob)))}
			</ScrollView>
		</View>
	);
};

export default EditProfile;
