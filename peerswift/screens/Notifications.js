import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// function
import formatDate from "../functions/formatDate";

const Notifications = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const notifications = [
		{
			notification_id: 1,
			user_id: 1,
			notification_type: "New Message",
			message: "You have a new message from John Doe",
			timestamp: "2024-04-12T12:00:00",
			is_read: false,
		},
		{
			notification_id: 2,
			user_id: 1,
			notification_type: "New Message",
			message: "You have a new message from John Doe",
			timestamp: "2021-12-12T12:00:00",
			is_read: false,
		},
	];

	const notificationItems = (notification) => {
		return (
			<View key={notification.id} style={style.notifBox}>
				<Text>{notification.message}</Text>
				<Text>{formatDate(notification.timestamp)}</Text>
			</View>
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
				<Text style={style.headerTitle}>Notifications</Text>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView
				style={{ width: theme.dimensions.width * 0.9, marginTop: 10 }}>
				{notifications.map((notification) => {
					return notificationItems(notification);
				})}
			</ScrollView>
		</View>
	);
};

export default Notifications;
