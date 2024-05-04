import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import { styles } from "../styles";

// API import
import getCountries from "../api client/countries/getCountries";
import { useQuery } from "@tanstack/react-query";
import AddToGroup from "../api client/groups/AddToGroup";

const Countries = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [countries, setCountries] = useState([]);

	const [loading, setLoading] = useState(false);

	// API Calls
	// Fetch countries
	const { isPending, data, error, refetch } = useQuery({
		queryKey: ["countries"],
		queryFn: getCountries,
	});

	const handleData = (data) => {
		setLoading(isPending);

		if (error) {
			console.log(error);
		}
		if (data) {
			if (data.status === "success") {
				setCountries(data.data);
			}
		}
	};

	useEffect(() => {
		handleData(data);
	}, [isPending]);

	// Add to group
	const addToGroup = async (group_id) => {
		const data = await AddToGroup(group_id);
		console.log(data);
	};

	const requestCountry = async (country) => {
		await SecureStore.setItemAsync("requestCountry", JSON.stringify(country));
	};

	// Country Component
	let countryCount = 0;

	const countryListItems = (country, countryCount) => {
		return (
			<TouchableOpacity
				style={[
					style.countryBox,
					{ borderTopWidth: countryCount === 1 ? 1 : 0 },
				]}
				onPress={() => {
					if (route.params.type === "groups") {
						addToGroup(country.id);
						navigation.goBack();
					} else if (route.params.type === "request") {
						requestCountry(country);
						navigation.goBack();
					}
				}}
				key={country.id}>
				<Image source={{ uri: country.flag }} style={style.countryFlag} />
				<Text style={style.countryName}>{country.name}</Text>
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
					{countries &&
						countries.map((country) => {
							countryCount++;
							return countryListItems(country, countryCount);
						})}
				</View>
			</ScrollView>
		</View>
	);
};

export default Countries;
