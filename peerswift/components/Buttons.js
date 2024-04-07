import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { TouchableOpacity, Text } from "react-native";

const Buttons = ({ type }) => {
	const theme = useTheme();
	const style = styles(theme);

	if (type === "primary") {
		return (
			<TouchableOpacity style={style.primaryButton}>
				<Text style={style.primaryButtonTxt}>Continue</Text>
			</TouchableOpacity>
		);
	}
};

export default Buttons;
