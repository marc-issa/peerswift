import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const ActivitiesCard = ({ data, type, navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	if (!data) {
		return null;
	}

	const statusColor = (status) => {
		switch (status) {
			case "Pending":
				return "#FFBF00";
			case "Matching":
				return "#EA9010";
			case "Completed" || "Matched":
				return "#06A77D";
			case "Cancelled":
				return "#D05353";
			default:
				return "#EA9010";
		}
	};

	return (
		<TouchableOpacity
			style={style.cardAct}
			onPress={() => navigation.navigate("DetailsScreen", { data: data })}>
			<View style={style.cardHeader}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					{data.user ? (
						<>
							<Image
								source={{ uri: data.user.flag }}
								style={style.cardActFlag}
							/>

							<Text style={style.cardActTitle}>{data.user.full_name}</Text>
							{data.kyc_status ? (
								<Image
									source={require("../assets/Icons/verified.png")}
									style={{ marginLeft: 5 }}
								/>
							) : null}
						</>
					) : (
						<Text style={style.cardActTitle}>
							{data.source
								? ` Top-up using a ${data.source}`
								: data.status === "Matching"
								? "We are looking for a match"
								: data.status === "Cancelled"
								? "Transaction Cancelled"
								: "Error"}
						</Text>
					)}
				</View>
				<Text style={style.cardActRating}>
					{data.user ? data.user.rating : null}
				</Text>
			</View>
			<View style={style.cardMid}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={style.cardCurrency}>
						{data.user ? "USD" : data.currency}
					</Text>
					<Text style={style.cardAmount}>{data.amount}</Text>
				</View>
				<Image source={require("../assets/Icons/transaction-reversed.png")} />
			</View>
			<View
				style={[
					style.cardFooter,
					{ backgroundColor: statusColor(data.status) },
				]}>
				<Text style={style.cardAction}>
					{data.source
						? "Top-up"
						: data.status === "Matching"
						? `${data.status}...`
						: data.status}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ActivitiesCard;
