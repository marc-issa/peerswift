import { useState, useEffect } from "react";

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Touchable,
} from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

// Components import
import AmountSelect from "../components/AmountSelect";
import Buttons from "../components/Buttons";

const RequestTransfer = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [amount, setAmount] = useState(0.0);

	const handleAmmountChange = (value) => {
		setAmount(value);
	};

	return (
		<KeyboardAvoidingView
			style={style.container}
			behavior={theme.os === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}>
				<ScrollView contentContainerStyle={{ flex: 1 }}>
					<View style={style.header}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Image
								source={require("../assets/Icons/back.png")}
								style={style.backButton}
							/>
						</TouchableOpacity>
						<Text style={style.headerTitle}>Request</Text>
						<View style={{ flex: 1 }}></View>
					</View>
					<View style={style.actionSection}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>
								Choose destination country
							</Text>
						</View>
						<TouchableOpacity
							onPress={() => navigation.navigate("Countries")}
							style={style.countriesButtonBox}>
							<Text style={style.countriesButtonTitle}>Select country</Text>
							<Image
								source={require("../assets/Icons/chevron.png")}
								style={style.countriesButtonIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={[style.actionSection, { borderBottomWidth: 0 }]}>
						<View style={style.actionSectionHeader}>
							<Text style={style.actionSectionTitle}>
								How much would you like to send?
							</Text>
						</View>
						<AmountSelect value={amount} onChange={handleAmmountChange} />
					</View>
					<Buttons
						type={"primary"}
						screen={"SendMoney"}
						navData={{}}
						navigation={navigation}
						disabled={true}
						title={"Send request"}
					/>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default RequestTransfer;
