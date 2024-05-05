import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const TermCond = ({ navigation }) => {
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
						By accessing or using the PeerSwift mobile application ("App"), you
						agree to be bound by these Terms and Conditions ("Terms"). Please
						read these Terms carefully before using our App.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>1. Use of the App</Text>: You must be
						at least 13 years old to use our App. By using the App, you
						represent and warrant that you are at least 13 years old.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>2. User Accounts</Text>: You may be
						required to create an account to access certain features of the App.
						You are responsible for maintaining the confidentiality of your
						account credentials and for any activities that occur under your
						account.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>3. User Conduct</Text>: You agree not
						to use the App for any unlawful or prohibited purpose. You also
						agree to comply with all applicable laws and regulations.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>4. Intellectual Property</Text>: The
						App and its original content, features, and functionality are owned
						by PeerSwift and are protected by international copyright,
						trademark, patent, trade secret, and other intellectual property or
						proprietary rights laws.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>5. Disclaimer</Text>: The App is
						provided on an "as-is" and "as-available" basis, without any
						warranties of any kind, express or implied. PeerSwift does not
						warrant that the App will be error-free or uninterrupted.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>6. Limitation of Liability</Text>: In
						no event shall PeerSwift be liable for any indirect, incidental,
						special, consequential, or punitive damages, including without
						limitation, loss of profits, data, use, goodwill, or other
						intangible losses, resulting from (i) your access to or use of or
						inability to access or use the App; (ii) any conduct or content of
						any third party on the App; (iii) any content obtained from the App;
						and (iv) unauthorized access, use, or alteration of your
						transmissions or content, whether based on warranty, contract, tort
						(including negligence), or any other legal theory, whether or not we
						have been informed of the possibility of such damage, and even if a
						remedy set forth herein is found to have failed of its essential
						purpose.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>7. Governing Law</Text>: These Terms
						shall be governed and construed in accordance with the laws of [Your
						Country], without regard to its conflict of law provisions.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>8. Changes</Text>: We reserve the
						right, at our sole discretion, to modify or replace these Terms at
						any time. If a revision is material, we will provide at least 30
						days' notice prior to any new terms taking effect. What constitutes
						a material change will be determined at our sole discretion.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>9. Contact Us</Text>: If you have any
						questions about these Terms, please contact us at
						[contact@email.com](mailto:contact@email.com).
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						These Terms were last updated on [Date].
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default TermCond;
