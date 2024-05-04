import React, { useState, useCallback, useEffect } from "react";

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import ActivitiesCard from "../components/activitiesCard";
import NoDataFound from "../components/NoDataFound";

// API import
import FetchSummary from "../api client/User/FetchSummary";
import { useQuery } from "@tanstack/react-query";

const Home = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [balance, setBalance] = useState("");
	const [currency, setCurrency] = useState("");
	const [rating, setRating] = useState(0);
	const [totalActivity, setTotalActivity] = useState(0);

	const [requests, setRequests] = useState([]);
	const [transactions, setTransactions] = useState([]);

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	// API Calls
	// Fetch Summary
	const { isPending, data, error, refetch } = useQuery({
		queryKey: ["summary"],
		queryFn: FetchSummary,
	});

	const handleData = (data) => {
		setLoading(isPending);

		if (error) {
			console.log(error);
		}
		if (data) {
			console.log(data);
			if (data.wallet) {
				setBalance(data.wallet.balance);
				setCurrency(data.wallet.currency);
			}
			if (data.rating) {
				setRating(data.rating);
			}
			if (data.activity) {
				setTotalActivity(data.activity);
			}
			if (data.recent_requests) {
				setRequests(data.recent_requests);
			}
			if (data.recent_transactions) {
				setTransactions(data.recent_transactions);
			}
		}
	};

	useEffect(() => {
		handleData(data);
	}, [isPending]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setLoading(true);
		refetch()
			.then((data) => {
				handleData(data.data);
				setRefreshing(false);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Failed to refresh data:", error);
				setRefreshing(false);
				setLoading(false);
			});
	}, [refetch]);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<View style={style.container}>
				<View style={style.header}>
					<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
						<Image
							source={require("../assets/Icons/menu.png")}
							style={style.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("Notifications")}>
						<Image
							source={require("../assets/Icons/notifications.png")}
							style={style.icon}
						/>
					</TouchableOpacity>
				</View>
				<View style={style.BalanceDisp}>
					<Text style={style.homeTxt}>Total Balance</Text>
					{loading ? (
						<ActivityIndicator size={"small"} />
					) : (
						<Text style={style.balanceTxt}>
							{currency} {""}
							{balance}
						</Text>
					)}
				</View>
				<View style={style.homeFunc}>
					<View style={style.stats}>
						<View style={[style.statsBox, { backgroundColor: "#06A77D" }]}>
							<Text style={style.statsTxtS}>rating</Text>
							{loading ? (
								<ActivityIndicator size={"small"} />
							) : (
								<Text style={style.statsTxtL}>{rating}</Text>
							)}
						</View>
						<View
							style={[
								style.statsBox,
								{
									backgroundColor: "#D05353",
									marginTop: theme.dimensions.height * 0.033,
								},
							]}>
							<Text style={style.statsTxtS}>activity</Text>
							{loading ? (
								<ActivityIndicator size={"small"} />
							) : (
								<Text style={style.statsTxtL}>{totalActivity}</Text>
							)}
						</View>
					</View>
					<View style={style.navs}>
						<TouchableOpacity
							style={style.navButton}
							onPress={() => navigation.navigate("SendMoney")}>
							<View style={style.navBox}>
								<Image
									source={require("../assets/Icons/send_money.png")}
									style={style.navIcon}
								/>
							</View>
							<Text style={style.navTxt}>send</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={style.navButton}
							onPress={() => navigation.navigate("RequestTransfer")}>
							<View style={style.navBox}>
								<Image
									source={require("../assets/Icons/money_transfer.png")}
									style={style.navIcon}
								/>
							</View>
							<Text style={style.navTxt}>request</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={style.navButton}
							onPress={() => navigation.navigate("TopUp")}>
							<View style={style.navBox}>
								<Image
									source={require("../assets/Icons/top_up.png")}
									style={style.navIcon}
								/>
							</View>
							<Text style={style.navTxt}>top-up</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={style.navButton}
							onPress={() =>
								navigation.navigate("Activity", { filter: "requests" })
							}>
							<View style={style.navBox}>
								<Image
									source={require("../assets/Icons/transaction.png")}
									style={style.navIcon}
								/>
							</View>
							<Text style={style.navTxt}>activity</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={style.navButton}
							onPress={() => navigation.navigate("Groups")}>
							<View style={style.navBox}>
								<Image
									source={require("../assets/Icons/groups.png")}
									style={style.navIcon}
								/>
							</View>
							<Text style={style.navTxt}>groups</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={style.recentContainer}>
					<View style={style.recentHeader}>
						<Text style={style.homeTxt}>Recent requests</Text>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Activity", { filter: "requests" })
							}>
							<Text style={style.linkTxt}>view all</Text>
						</TouchableOpacity>
					</View>
					{requests.length === 0 && <NoDataFound />}
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						style={{ paddingVertical: 10 }}>
						{requests.map((request, index) => (
							<ActivitiesCard key={index} data={request} type={"request"} />
						))}
					</ScrollView>
				</View>
				<View style={style.recentContainer}>
					<View style={style.recentHeader}>
						<Text style={style.homeTxt}>Recent transactions</Text>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Activity", { filter: "transactions" })
							}>
							<Text style={style.linkTxt}>view all</Text>
						</TouchableOpacity>
					</View>
					{transactions.length === 0 && <NoDataFound />}
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						style={{ paddingVertical: 10 }}>
						{transactions.map((request, index) => (
							<ActivitiesCard key={index} data={request} type={"transaction"} />
						))}
					</ScrollView>
				</View>
			</View>
		</ScrollView>
	);
};

export default Home;
