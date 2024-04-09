import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import ActivitiesCard from "../components/activitiesCard";

const Home = () => {
	const theme = useTheme();
	const style = styles(theme);

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
		},
	];
	const transactionsDummy = [
		{
			history_id: 1,
			transaction_id: 1,
			user_id: 100,
			action_type: "VIEWED",
			timestamp: "2024-04-08 14:00:00",
		},
		{
			history_id: 2,
			transaction_id: 2,
			user_id: 101,
			action_type: "UPDATED",
			timestamp: "2024-04-08 15:00:00",
		},
		{
			history_id: 3,
			transaction_id: 3,
			user_id: 102,
			action_type: "DELETED",
			timestamp: "2024-04-08 16:00:00",
		},
		{
			history_id: 4,
			transaction_id: 4,
			user_id: 103,
			action_type: "VIEWED",
			timestamp: "2024-04-08 17:00:00",
		},
		{
			history_id: 5,
			transaction_id: 5,
			user_id: 104,
			action_type: "COMPLETED",
			timestamp: "2024-04-08 18:00:00",
		},
	];
	return (
		<View style={style.container}>
			<View style={style.homeHeader}>
				<TouchableOpacity>
					<Image
						source={require("../assets/Icons/menu.png")}
						style={style.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Image
						source={require("../assets/Icons/notifications.png")}
						style={style.icon}
					/>
				</TouchableOpacity>
			</View>
			<View style={style.BalanceDisp}>
				<Text style={style.homeTxt}>Total Balance</Text>
				<Text style={style.balanceTxt}>$2,360.14</Text>
			</View>
			<View style={style.homeFunc}>
				<View style={style.stats}>
					<View style={[style.statsBox, { backgroundColor: "#06A77D" }]}>
						<Text style={style.statsTxtS}>rating</Text>
						<Text style={style.statsTxtL}>3.5</Text>
					</View>
					<View
						style={[
							style.statsBox,
							{
								backgroundColor: "#D05353",
								marginTop: theme.dimensions.height * 0.026,
							},
						]}>
						<Text style={style.statsTxtS}>activity</Text>
						<Text style={style.statsTxtL}>45</Text>
					</View>
				</View>
				<View style={style.navs}>
					<TouchableOpacity style={style.navButton}>
						<View style={style.navBox}>
							<Image
								source={require("../assets/Icons/send_money.png")}
								style={style.navIcon}
							/>
						</View>
						<Text style={style.navTxt}>send</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.navButton}>
						<View style={style.navBox}>
							<Image
								source={require("../assets/Icons/money_transfer.png")}
								style={style.navIcon}
							/>
						</View>
						<Text style={style.navTxt}>request</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.navButton}>
						<View style={style.navBox}>
							<Image
								source={require("../assets/Icons/top_up.png")}
								style={style.navIcon}
							/>
						</View>
						<Text style={style.navTxt}>top-up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.navButton}>
						<View style={style.navBox}>
							<Image
								source={require("../assets/Icons/transaction.png")}
								style={style.navIcon}
							/>
						</View>
						<Text style={style.navTxt}>activity</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.navButton}>
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
				<Text style={style.homeTxt}>Recent Transactions</Text>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					style={{ paddingVertical: 10 }}>
					{requestsDummy.map((request, index) => (
						<ActivitiesCard key={index} data={request} />
					))}
				</ScrollView>
			</View>
		</View>
	);
};

export default Home;
