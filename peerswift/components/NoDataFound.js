import { View, Image, Text } from "react-native";

import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const NoDataFound = () => {
	const theme = useTheme();
	const style = styles(theme);

	return (
		<View style={style.noDataBox}>
			<Image source={require("../assets/Icons/empty.png")} />
			<Text style={style.noDataText}>No data found</Text>
		</View>
	);
};

export default NoDataFound;
