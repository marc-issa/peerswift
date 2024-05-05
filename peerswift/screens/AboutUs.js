import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const AboutUs = ({ navigation }) => {
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
				<Text style={style.headerTitle}>About Us</Text>
				<View style={{ flex: 1 }}></View>
			</View>
			<ScrollView style={{ flex: 1 }}>
				<View style={style.utilityBox}>
					<Text style={style.utilityText}>
						PeerSwift is a revolutionary platform that redefines the dynamics of
						international transactions by fostering connections among users
						within specific country groups. Through our innovative approach,
						users can seamlessly initiate requests to transfer money, tapping
						into a network where the app intelligently pairs them with
						counterparts seeking a reciprocal exchange.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						Here's how it works: Users commit to the exchange by placing
						temporary holds on their credit cards, ensuring the security and
						integrity of the transaction. Once the funds are successfully
						exchanged locally, these holds are promptly released, thereby
						eliminating the burdensome and often exorbitant fees associated with
						traditional international transfers.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						Our platform offers a simple yet effective solution rooted in
						community collaboration, facilitating more efficient and economical
						cross-border transactions. With PeerSwift, the process of sending
						and receiving money across borders becomes not only seamless but
						also financially empowering for individuals worldwide.
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default AboutUs;
