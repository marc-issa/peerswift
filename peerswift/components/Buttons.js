import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { TouchableOpacity, Text } from "react-native";

const Buttons = ({ navigation, type, screen, disabled, title, navData }) => {
	const theme = useTheme();
	const style = styles(theme);

	const primaryRedirect = () => {
		navigation.replace([screen, { navData }]);
	};

	if (type === "primary") {
		return (
			<TouchableOpacity
				style={[style.primaryButton, disabled && style.disabledButton]}
				disabled={disabled}
				onPress={primaryRedirect}>
				<Text style={style.primaryButtonTxt}>{title}</Text>
			</TouchableOpacity>
		);
	}
};

export default Buttons;
