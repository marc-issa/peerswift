import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const ActCardLong = ({ data }) => {
	const theme = useTheme();
	const style = styles(theme);

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
		<TouchableOpacity style={style.cardActLong}>
			<View style={style.cardHeader}>
				<Image source={require("../assets/Icons/transaction-reversed.png")} />
				<View
					style={{
						flexDirection: "column",
						alignItems: "flex-start",
						marginLeft: 20,
					}}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}>
						{data.user ? (
							<>
								<Image
									source={{ uri: data.user.flag }}
									style={style.cardActFlagLong}
								/>
								<Text style={[style.cardActTitle, { fontSize: 18 }]}>
									{data.user.full_name}
								</Text>
								{data.user.kyc_status ? (
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
									? "Looking for a match"
									: data.status === "Cancelled"
									? "Transaction Cancelled"
									: "Error"}
							</Text>
						)}
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 5,
						}}>
						<Text style={style.cardCurerncyLong}>
							{data.user ? "USD" : data.currency}
						</Text>
						<Text style={style.cardAmountLong}>{data.amount}</Text>
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
					{data.user ? data.user.rating : null}
				</Text>
				<View
					style={[
						style.cardFooterLong,
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
			</View>
		</TouchableOpacity>
	);
};

export default ActCardLong;
