import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const PrivPol = ({ navigation }) => {
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
				<Text style={style.headerTitle}>Privacy Policy</Text>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView style={{ flex: 1 }}>
				<View style={style.utilityBox}>
					<Text style={style.utilityText}>
						At PeerSwift, we are committed to protecting the privacy and
						security of our users' personal information. This Privacy Policy
						outlines how we collect, use, disclose, and safeguard your data when
						you use our mobile application ("App").
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Information We Collect</Text>: We may
						collect certain information when you use our App, including: 1.
						Personal Information: This may include your name, email address,
						phone number, and payment information. 2. Transaction Data: We
						collect data related to your transactions, including recipient
						details, transaction amounts, and timestamps. 3. Device Information:
						We may collect information about your device, such as device type,
						operating system, and unique device identifiers. 4. Usage
						Information: This includes data about how you interact with our App,
						such as pages visited, features used, and navigation paths.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>How We Use Your Information</Text>: We
						use the information we collect for the following purposes: 1. To
						Provide Services: We use your data to facilitate transactions,
						process payments, and provide customer support. 2. To Improve Our
						Services: We analyze user interactions and feedback to enhance the
						functionality and user experience of our App. 3. To Personalize
						Content: We may tailor our services and communications to better
						suit your preferences and interests. 4. To Ensure Security: We
						utilize your information to detect and prevent fraud, abuse, and
						unauthorized access to our systems.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Data Sharing and Disclosure</Text>: We
						may share your information with third parties under the following
						circumstances: 1. Service Providers: We may engage third-party
						service providers to assist us in delivering our services, such as
						payment processors and analytics providers. 2. Legal Compliance: We
						may disclose your information to comply with legal obligations,
						respond to lawful requests, or protect our rights and interests. 3.
						Business Transfers: In the event of a merger, acquisition, or sale
						of assets, your information may be transferred as part of the
						transaction.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Data Security</Text>: We implement
						reasonable security measures to protect your information from
						unauthorized access, disclosure, alteration, or destruction.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Data Retention</Text>: We retain your
						information for as long as necessary to fulfill the purposes
						outlined in this Privacy Policy, unless a longer retention period is
						required or permitted by law.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Your Choices</Text>: You have the right
						to access, update, or delete your personal information. You can also
						opt out of certain communications or data processing activities.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Children's Privacy</Text>: Our App is
						not intended for use by children under the age of 13. We do not
						knowingly collect or solicit personal information from children.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Updates to this Policy</Text>: We may
						update this Privacy Policy from time to time. We will notify you of
						any material changes by posting the updated policy on our website or
						through other appropriate channels.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Contact Us</Text>: If you have any
						questions or concerns about this Privacy Policy or our data
						practices, please contact us at
						[contact@email.com](mailto:contact@email.com).
					</Text>
					<Text
						style={[style.utilityText, { marginTop: 10, marginBottom: 40 }]}>
						This Privacy Policy was last updated on 05 May 2024.
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default PrivPol;
