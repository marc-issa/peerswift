import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import ActivitiesCard from "../components/activitiesCard";

const Home = ({ navigation }) => {
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
		<ScrollView>
			<View style={style.container}>
				<View style={style.header}>
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
					<View style={style.recentHeader}>
						<Text style={style.homeTxt}>Recent requests</Text>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("Activity", { filter: "requests" })
							}>
							<Text style={style.linkTxt}>view all</Text>
						</TouchableOpacity>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						style={{ paddingVertical: 10 }}>
						{requestsDummy.map((request, index) => (
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
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						style={{ paddingVertical: 10 }}>
						{requestsDummy.map((request, index) => (
							<ActivitiesCard key={index} data={request} type={"transaction"} />
						))}
					</ScrollView>
				</View>
			</View>
		</ScrollView>
	);
};

export default Home;
