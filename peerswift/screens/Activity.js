// Import necessary dependencies from React and React Native
import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
} from "react-native";

// Import component
import ActCardLong from "../components/ActCardLong";
import NoDataFound from "../components/NoDataFound";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// API imports
import FetchRequests from "../api client/requests/FetchRequests";
import FetchTransactions from "../api client/transactions/FetchTransactions";
import { useQuery } from "@tanstack/react-query";

const Activity = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [requests, setRequests] = useState([]);
	const [transactions, setTransactions] = useState([]);

	const [filter, setFilter] = useState(route.params.filter);
	const [refreshing, setRefreshing] = useState(false);

	const handleChangeFilter = (newFilter) => {
		setFilter(newFilter);
	};

	// API Calls
	// Fetch Requests
	const { isPending, data, error, refetch } = useQuery({
		queryKey: ["requests"],
		queryFn: FetchRequests,
	});

	const handleRequestsData = (data) => {
		if (error) {
			console.log(error);
		}
		if (data) {
			if (data.status === "success") {
				setRequests(data.requests);
			} else {
				console.log("error");
			}
		}
	};

	useEffect(() => {
		handleRequestsData(data);
	}, [isPending]);

	// Fetch Transactions
	const {
		isPending: isPendingTransactions,
		data: dataTransactions,
		error: errorTransactions,
		refetch: refetchTransactions,
	} = useQuery({
		queryKey: ["transactions"],
		queryFn: FetchTransactions,
	});

	const handleTransactionsData = (data) => {
		if (errorTransactions) {
			console.log(errorTransactions);
		}
		if (data) {
			if (data.status === "success") {
				setTransactions(data.transactions);
			} else {
				console.log("error");
			}
		}
	};

	useEffect(() => {
		handleTransactionsData(dataTransactions);
	}, [isPendingTransactions]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		if (filter === "requests") {
			refetch()
				.then((data) => {
					handleRequestsData(data.data);
					setRefreshing(false);
				})
				.catch((error) => {
					console.error("Failed to refresh data:", error);
					setRefreshing(false);
				});
		} else {
			refetchTransactions()
				.then((data) => {
					handleTransactionsData(data.data);
					setRefreshing(false);
				})
				.catch((error) => {
					console.error("Failed to refresh data:", error);
					setRefreshing(false);
				});
		}
	}, [refetch, refetchTransactions]);

	return (
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
									filter === "transactions" ? theme.colors.primary : "#F6F6F6",
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
			{filter === "requests" && requests.length === 0 && <NoDataFound />}
			{filter === "transactions" && transactions.length === 0 && (
				<NoDataFound />
			)}
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				<View style={style.listContainer}>
					{filter === "requests" &&
						requests.map((request) => (
							<ActCardLong
								key={request.id}
								data={request}
								navigation={navigation}
							/>
						))}
					{filter === "transactions" &&
						transactions.map((transaction) => (
							<ActCardLong
								key={transaction.id}
								data={transaction}
								navigation={navigation}
							/>
						))}
				</View>
			</ScrollView>
		</View>
	);
};

export default Activity;
