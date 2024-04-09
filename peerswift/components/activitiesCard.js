import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const ActivitiesCard = ({ data }) => {
	const theme = useTheme();
	const style = styles(theme);
	return (
		<View style={style.cardAct}>
			<Text>Card 1</Text>
		</View>
	);
};

export default ActivitiesCard;
