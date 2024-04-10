// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// Functions import
import formatMessage from "../functions/formatMessage";

const Groups = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);
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
					onPress={() => console.log("Navigating to country select")}>
					<Image
						soruce={require("../assets/Icons/add.png")}
						style={style.backButton}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View style={style.groupList}>
					<TouchableOpacity
						style={[
							style.groupBox,
							{ borderTopWidth: 1, borderTopColor: theme.colors.accent },
						]}>
						<Image
							source={{ uri: "https://flagcdn.com/w320/cy.png" }}
							style={style.groupIcon}
						/>
						<View style={style.groupInfoBox}>
							<Text style={style.groupName}>Cyprus</Text>
							<Text style={style.groupLastMessage}>
								{formatMessage(
									"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam qui architecto, fugit ipsum maiores nostrum nihil accusantium suscipit optio inventore vero cupiditate doloremque earum labore numquam ex asperiores veritatis ad.",
								)}
							</Text>
						</View>
						<View style={style.groupTimeBox}>
							<Text style={style.lastMessageTime}>8:45 AM</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

export default Groups;
