import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import Buttons from "../components/Buttons";
import ErrorComponent from "../components/ErrorComponent";

// API imports
import CancelRequest from "../api client/requests/CancelRequest";

const DetailsScreen = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [data, setData] = useState(route.params.data);

	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);

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

	// Error handling
	const [modalVisible, setModalVisible] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleError = () => {
		setModalVisible(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setModalVisible(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [modalVisible]);

	const dateFormat = (date) => {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const d = new Date(date);
		const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
		const month = months[d.getMonth()];
		const year = d.getFullYear();
		return `${day} ${month} ${year}`;
	};

	useEffect(() => {
		if (data.source) {
			setTitle(`#T-${data.id}`);
		} else if (data.status === "Matching") {
			setTitle(`#R-${data.id}`);
		} else {
			setTitle(`#T-${data.id}`);
		}
	}, [data]);

	const handleSubmit = async () => {
		setLoading(true);
		await CancelRequest({ request_id: data.id }).then((res) => {
			if (res.status === "success") {
				alert("Request cancelled successfully");
				navigation.goBack();
			} else {
				setErrorMsg(res.message);
				handleError();
			}
		});
		setLoading(false);
	};
	return (
		<View style={style.container}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={style.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Image
							source={require("../assets/Icons/back.png")}
							style={style.backButton}
						/>
					</TouchableOpacity>
					<Text style={style.headerTitle}>{title}</Text>
					<View style={{ flex: 1 }}></View>
				</View>
				<View style={style.detailsHeader}>
					<Text style={style.detailsHeaderTxt}>Transaction Details</Text>
					<View
						style={[
							style.detailsStatusBox,
							{ backgroundColor: statusColor(data.status) },
						]}>
						<Text style={style.detailsStatus}>
							{data.status ? data.status : "Top-up"}
						</Text>
					</View>
				</View>

				<View style={style.detailsBody}>
					{data.user ? (
						<View style={style.detailsRows}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									source={{ uri: data.user.flag }}
									style={{
										width: 50,
										height: 50,
										borderRadius: 100,
										marginRight: 10,
									}}
								/>
								<Text style={{ fontSize: 20, fontWeight: "bold" }}>
									{data.user.full_name}
								</Text>
							</View>
						</View>
					) : null}
					{data.source ? (
						<View style={style.detailsRows}>
							<Text style={style.detailsTxt}>Source</Text>
							<Text style={style.detailsTxt}>{data.source}</Text>
						</View>
					) : null}
					{data.destination_country ? (
						<View style={style.detailsRows}>
							<Text style={style.detailsTxt}>Destination</Text>
							<Text style={style.detailsTxt}>
								{data.destination_country.name}
							</Text>
						</View>
					) : null}
					{data.hold ? (
						<View style={style.detailsRows}>
							<Text style={style.detailsTxt}>Hold</Text>
							<Text style={style.detailsTxt}>{data.hold.status}</Text>
						</View>
					) : null}
					<View style={style.detailsRows}>
						<Text style={style.detailsTxt}>Date</Text>
						{data.completion_date || data.creation_date ? (
							<Text style={style.detailsTxt}>
								{data.completion_date
									? dateFormat(data.completion_date)
									: dateFormat(data.creation_date)}
							</Text>
						) : (
							<Text style={style.detailsTxt}>{dateFormat(data.time)}</Text>
						)}
					</View>
					<View style={style.detailsRows}>
						<Text style={style.detailsTxt}>Amount</Text>
						<Text style={style.detailsTxt}>USD {data.amount}</Text>
					</View>
					<View style={style.detailsRows}>
						<Text style={style.detailsTxt}>Fee</Text>
						<Text style={style.detailsTxt}>
							USD {data.fee ? data.fee : "0.00"}
						</Text>
					</View>
					<View style={style.detailsTotalBox}>
						<Text style={style.detailsTotalTxt}>Total</Text>
						<Text style={style.detailsTotalTxt}>USD {data.amount}</Text>
					</View>
					<Buttons
						type={"primary"}
						screen={"CancelLong"}
						title={"Cancel"}
						disabled={false}
						handleSubmit={handleSubmit}
					/>
					<ErrorComponent
						isVisible={modalVisible}
						message={errorMsg || "An error occurred"}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default DetailsScreen;
