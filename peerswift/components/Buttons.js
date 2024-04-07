import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { TouchableOpacity, Text } from "react-native";

const Buttons = ({ navigation, type, screen, disabled }) => {
	const theme = useTheme();
	const style = styles(theme);

	if (type === "primary") {
		return (
			<TouchableOpacity
				style={[style.primaryButton, disabled && style.disabledButton]}
				disabled={disabled}
				onPress={() => navigation.replace(screen)}>
				<Text style={style.primaryButtonTxt}>Continue</Text>
			</TouchableOpacity>
		);
	}
};

export default Buttons;
