import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const ActivitiesCard = ({ data, type }) => {
	const theme = useTheme();
	const style = styles(theme);

	const cardType = type === "request" ? "request" : "transaction";

	const statusColor = (status) => {
		switch (status) {
			case "PENDING":
				return "#FFBF00";
			case "IN_PROGRESS":
				return "#EA9010";
			case "COMPLETED":
				return "#06A77D";
			case "CANCELLED":
				return "#D05353";
			default:
				return "#EA9010";
		}
	};

	return (
		<TouchableOpacity style={style.cardAct}>
			<View style={style.cardHeader}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Image
						source={{ uri: data.country.flag }}
						style={style.cardActFlag}
					/>
					<Text style={style.cardActTitle}>{data.user.username}</Text>
					<Image
						source={require("../assets/Icons/verified.png")}
						style={{ marginLeft: 5 }}
					/>
				</View>
				<Text style={style.cardActRating}>{data.user_rating}</Text>
			</View>
			<View style={style.cardMid}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={style.cardCurrency}>{data.country.currency_code}</Text>
					<Text style={style.cardAmount}>{data.amount}.00</Text>
				</View>
				<Image source={require("../assets/Icons/transaction-reversed.png")} />
			</View>
			<View
				style={[
					style.cardFooter,
					{ backgroundColor: statusColor(data.status) },
				]}>
				<Text style={style.cardAction}>{data.status}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ActivitiesCard;
