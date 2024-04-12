import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const EditProfile = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const profileField = (title) => {
		return (
			<View style={[style.profileItem, { marginTop: 10, paddingVertical: 15 }]}>
				<Text style={style.profileItemText}>{title}</Text>
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
				<View style={style.profileHeader}>
					<View style={{ flex: 1 }}></View>
					<Text style={style.profileName}>Profile</Text>
					<View style={{ flex: 1 }}></View>
				</View>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView
				style={{ width: theme.dimensions.width * 0.9, paddingTop: 20 }}>
				<Text style={[style.profileSection, { marginTop: 10 }]}>
					Phone Number
				</Text>
				{profileField("+961 71 123 456")}
				<Text style={[style.profileSection, { marginTop: 20 }]}>Full Name</Text>
				{profileField("John Doe")}
				<Text style={[style.profileSection, { marginTop: 20 }]}>
					Middle Name
				</Text>
				{profileField("Doe")}
				<Text style={[style.profileSection, { marginTop: 20 }]}>
					Date of Birth
				</Text>
				{profileField("1/1/2002")}
			</ScrollView>
		</View>
	);
};

export default EditProfile;
