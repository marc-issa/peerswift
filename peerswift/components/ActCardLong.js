import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const ActCardLong = ({ data }) => {
	const theme = useTheme();
	const style = styles(theme);

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
		<TouchableOpacity style={style.cardActLong}>
			<View style={style.cardHeader}>
				<Image source={require("../assets/Icons/transaction-reversed.png")} />
				<View
					style={{
						flexDirection: "column",
						alignItems: "center",
						marginLeft: 10,
					}}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Image
							source={{ uri: data.country.flag }}
							style={style.cardActFlagLong}
						/>
						<Text style={[style.cardActTitle, { fontSize: 18 }]}>
							{data.user.username}
						</Text>
						<Image
							source={require("../assets/Icons/verified.png")}
							style={{ marginLeft: 5 }}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 5,
						}}>
						<Text style={style.cardCurerncyLong}>
							{data.country.currency_code}
						</Text>
						<Text style={style.cardAmountLong}>{data.amount}.00</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: "column",
					alignItems: "flex-end",
					justifyContent: "space-between",
					paddingTop: 10,
				}}>
				<Text style={[style.cardActRating, { paddingRight: 10 }]}>
					{data.user_rating}
				</Text>
				<View
					style={[
						style.cardFooterLong,
						{ backgroundColor: statusColor(data.status) },
					]}>
					<Text style={style.cardAction}>{data.status}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ActCardLong;
