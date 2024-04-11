import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";

import { styles } from "../styles";

const Countries = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	let countryCount = 0;

	const countryList = [
		{
			country_id: 1,
			country_name: "Cyprus",
			country_flag: "https://flagcdn.com/w320/cy.png",
		},
		{
			country_id: 2,
			country_name: "Cyprus",
			country_flag: "https://flagcdn.com/w320/cy.png",
		},
	];

	const countryListItems = (country, countryCount) => {
		return (
			<TouchableOpacity
				style={[
					style.countryBox,
					{ borderTopWidth: countryCount === 1 ? 1 : 0 },
				]}
				key={country.country_id}>
				<Image
					source={{ uri: country.country_flag }}
					style={style.countryFlag}
				/>
				<Text style={style.countryName}>{country.country_name}</Text>
			</TouchableOpacity>
		);
	};
	return (
		<View style={style.container}>
			<View style={style.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/Icons/back.png")}
						style={style.backButton}
					/>
				</TouchableOpacity>
				<Text style={style.headerTitle}>select a country</Text>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView>
				<View style={style.countriesList}>
					{countryList.map((country, index) => {
						countryCount++;
						return countryListItems(country, countryCount);
					})}
				</View>
			</ScrollView>
		</View>
	);
};

export default Countries;
