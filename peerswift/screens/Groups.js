import { useState, useEffect } from "react";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// Functions import
import formatMessage from "../functions/formatMessage";
import formatLastMessageDate from "../functions/formatLastMessageDate";

// API import
import FetchGroups from "../api client/groups/FetchGroups";
import { useQuery } from "@tanstack/react-query";

const Groups = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [groups, setGroups] = useState([]);

	const [loading, setLoading] = useState(false);

	const { isPending, data, error } = useQuery({
		queryKey: ["groups"],
		queryFn: FetchGroups,
	});

	const handleData = (data) => {
		setLoading(isPending);

		if (error) {
			console.log(error);
			setGroups([]);
		}
		if (data) {
			setGroups(data.data);
		}
	};

	useEffect(() => {
		handleData(data);
	}, [isPending]);

	return (
		<View style={style.container}>
			<View style={style.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image
						source={require("../assets/Icons/back.png")}
						style={style.backButton}
					/>
				</TouchableOpacity>
				<Text style={style.headerTitle}>Groups</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate("Countries", { type: "groups" })}>
					<Image
						source={require("../assets/Icons/add.png")}
						style={{
							width: theme.dimensions.width * 0.075,
							height: theme.dimensions.width * 0.075,
						}}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View style={style.groupList}>
					{groups.map((group) => (
						<TouchableOpacity
							key={group.id}
							style={[
								style.groupBox,
								{ borderTopWidth: 1, borderTopColor: theme.colors.accent },
							]}
							onPress={() =>
								navigation.navigate("GroupChat", { group: group })
							}>
							<Image
								source={{ uri: group.country.flag }}
								style={style.groupIcon}
							/>
							<View style={style.groupInfoBox}>
								<Text style={style.groupName}>{group.group.name}</Text>
								{group.last_message ? (
									<Text style={style.groupLastMessage}>
										{formatMessage(group.last_message.message)}
									</Text>
								) : null}
							</View>
							<View style={style.groupTimeBox}>
								<Text style={style.lastMessageTime}>
									{group.last_message
										? formatLastMessageDate(group.last_message.timestamp)
										: ""}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default Groups;
