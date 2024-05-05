import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const Fees = ({ navigation }) => {
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
						Thank you for using PeerSwift! Below are the fee structures for
						various transactions:
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Sending Money:</Text> There are no fees
						associated with sending money through PeerSwift. Enjoy hassle-free
						transfers to your friends and family without worrying about
						additional charges.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Top Ups:</Text> Top ups also come with
						zero fees. You can easily add funds to your PeerSwift account
						whenever you need without incurring any additional costs.
					</Text>
					<Text style={[style.utilityText, { marginTop: 10 }]}>
						<Text style={style.boldText}>Requests:</Text> When you make a
						request for money through PeerSwift, a fee of 1% will be applied to
						the requested amount. This fee helps us maintain and improve our
						platform to ensure smooth and secure transactions for all users.
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default Fees;
