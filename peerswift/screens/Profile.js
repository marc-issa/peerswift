import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const Profile = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const icons = {
		profile: require("../assets/Icons/profile.png"),
		shield: require("../assets/Icons/shield.png"),
		about: require("../assets/Icons/about.png"),
		shield_search: require("../assets/Icons/shield_search.png"),
		terms: require("../assets/Icons/terms.png"),
		fees: require("../assets/Icons/fees.png"),
		logout: require("../assets/Icons/logout.png"),
	};

	const profileItem = (title, iconName, redirect) => {
		const icon = icons[iconName];
		return (
			<TouchableOpacity
				style={[
					style.profileItem,
					{ marginTop: iconName === "logout" ? 40 : 20 },
				]}
				onPress={() => console.log(redirect)}>
				<Image source={icon} style={style.profileItemIcon} />
				<Text style={style.profileItemText}>{title}</Text>
			</TouchableOpacity>
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
					<Image
						source={{ uri: "https://flagcdn.com/w320/cy.png" }}
						style={style.groupChatIcon}
					/>
					<Text style={style.profileName}>John Doe</Text>
					<Image
						source={require("../assets/Icons/profile_verified.png")}
						style={{
							marginLeft: 10,
						}}
					/>
				</View>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView
				style={{ width: theme.dimensions.width * 0.9, paddingTop: 20 }}>
				<Text style={style.profileSection}>Settings</Text>
				{profileItem("Edit Profile", "profile", "EditProfile")}
				{profileItem("KYC Verification", "shield", "KYCVerification")}
				<Text style={[style.profileSection, { marginTop: 20 }]}>About us</Text>
				{profileItem("About us", "about", "AboutUs")}
				{profileItem("Privacy Policy", "shield_search", "PrivacyPolicy")}
				{profileItem("Terms & Conditions", "terms", "TermsConditions")}
				{profileItem("Fees", "fees", "FeesCharges")}
				{profileItem("Logout", "logout", "Logout")}
			</ScrollView>
		</View>
	);
};

export default Profile;
