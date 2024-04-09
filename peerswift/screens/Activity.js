// Import necessary dependencies from React and React Native
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
// Import PanGestureHandler from react-native-gesture-handler for detecting swipe gestures
import { PanGestureHandler } from "react-native-gesture-handler";

// Import your styles
import { styles } from "../styles";

const Activity = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [filter, setFilter] = useState(route.params.filter);

	const handleChangeFilter = (newFilter) => {
		setFilter(newFilter);
	};

	const onSwipe = (event) => {
		const { velocityX } = event.nativeEvent;
		// Change filter based on the direction of the swipe
		if (velocityX > 0) {
			handleChangeFilter("requests");
		} else if (velocityX < 0) {
			handleChangeFilter("transactions");
		}
	};

	const requestsDummy = [
		{
			history_id: 1,
			request_id: 1,
			matched_id: 1,
			user_id: 100,
			event_type: "CREATED",
			amount: 500.0,
			currency: "USD",
			status: "PENDING",
			timestamp: "2024-04-08 10:00:00",
			description: "Initial request creation",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 2,
			request_id: 2,
			matched_id: 2,
			user_id: 101,
			event_type: "MATCHED",
			amount: 200.0,
			currency: "EUR",
			status: "IN_PROGRESS",
			timestamp: "2024-04-08 11:00:00",
			description: "Match found for transfer",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 3,
			request_id: 3,
			matched_id: null,
			user_id: 102,
			event_type: "CANCELLED",
			amount: 150.0,
			currency: "GBP",
			status: "CANCELLED",
			timestamp: "2024-04-08 12:00:00",
			description: "User cancelled request",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 4,
			request_id: 4,
			matched_id: 3,
			user_id: 103,
			event_type: "COMPLETED",
			amount: 750.0,
			currency: "USD",
			status: "COMPLETED",
			timestamp: "2024-04-08 13:00:00",
			description: "Transfer completed successfully",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 5,
			request_id: 5,
			matched_id: 4,
			user_id: 104,
			event_type: "UPDATED",
			amount: 300.0,
			currency: "USD",
			status: "IN_PROGRESS",
			timestamp: "2024-04-08 14:00:00",
			description: "Request details updated",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
	];
	const transactionsDummy = [
		{
			history_id: 1,
			request_id: 1,
			matched_id: 1,
			user_id: 100,
			event_type: "CREATED",
			amount: 500.0,
			currency: "USD",
			status: "PENDING",
			timestamp: "2024-04-08 10:00:00",
			description: "Initial request creation",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 2,
			request_id: 2,
			matched_id: 2,
			user_id: 101,
			event_type: "MATCHED",
			amount: 200.0,
			currency: "EUR",
			status: "IN_PROGRESS",
			timestamp: "2024-04-08 11:00:00",
			description: "Match found for transfer",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 3,
			request_id: 3,
			matched_id: null,
			user_id: 102,
			event_type: "CANCELLED",
			amount: 150.0,
			currency: "GBP",
			status: "CANCELLED",
			timestamp: "2024-04-08 12:00:00",
			description: "User cancelled request",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 4,
			request_id: 4,
			matched_id: 3,
			user_id: 103,
			event_type: "COMPLETED",
			amount: 750.0,
			currency: "USD",
			status: "COMPLETED",
			timestamp: "2024-04-08 13:00:00",
			description: "Transfer completed successfully",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
		{
			history_id: 5,
			request_id: 5,
			matched_id: 4,
			user_id: 104,
			event_type: "UPDATED",
			amount: 300.0,
			currency: "USD",
			status: "IN_PROGRESS",
			timestamp: "2024-04-08 14:00:00",
			description: "Request details updated",
			user: {
				user_id: 100,
				username: "John Doe",
			},
			country: {
				flag: "https://flagcdn.com/w320/cy.png",
				currency_code: "USD",
			},
			user_rating: 4.5,
		},
	];

	return (
		<PanGestureHandler onEnded={onSwipe}>
			<View style={style.container}>
				<View style={style.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Image
							source={require("../assets/Icons/back.png")}
							style={style.backButton}
						/>
					</TouchableOpacity>
					<Text style={style.headerTitle}>Activity</Text>
					<View style={{ flex: 1 }}></View>
				</View>

				<View style={style.filterDesign}>
					<View style={style.filterBox}>
						<TouchableOpacity
							onPress={() => handleChangeFilter("requests")}
							style={[
								style.filterIndvBox,
								{
									backgroundColor:
										filter === "requests" ? theme.colors.primary : "#F6F6F6",
								},
							]}>
							<Text
								style={[
									style.filterTxt,
									{
										color:
											filter !== "requests" ? theme.colors.primary : "#F6F6F6",
									},
								]}>
								Requests
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleChangeFilter("transactions")}
							style={[
								style.filterIndvBox,
								{
									backgroundColor:
										filter === "transactions"
											? theme.colors.primary
											: "#F6F6F6",
								},
							]}>
							<Text
								style={[
									style.filterTxt,
									{
										color:
											filter !== "transactions"
												? theme.colors.primary
												: "#F6F6F6",
									},
								]}>
								Transactions
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</PanGestureHandler>
	);
};

export default Activity;
