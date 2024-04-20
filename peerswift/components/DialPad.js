import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

const DialPad = ({ onChange, isPending }) => {
	const theme = useTheme();
	const style = styles(theme);

	const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "0", "<"];

	// Function to handle press events
	const handlePress = (button) => {
		if (button === " ") {
			return;
		}
		onChange(button);
	};

	return (
		<View style={style.buttonGrid}>
			{buttons.map((button) => (
				<TouchableOpacity
					disabled={isPending}
					key={button}
					style={style.dialButton}
					onPress={() => handlePress(button)}>
					<Text style={style.dialText}>{button}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default DialPad;
