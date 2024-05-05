import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const Buttons = ({
	type,
	screen,
	disabled,
	title,
	isPending,
	handleSubmit,
}) => {
	const theme = useTheme();
	const style = styles(theme);

	const primaryRedirect = () => {
		handleSubmit();
	};

	if (type === "primary") {
		return (
			<TouchableOpacity
				style={[
					style.primaryButton,
					disabled && style.disabledButton,
					screen === "SendMoney" && { width: theme.dimensions.width * 0.9 },
					screen === "CancelLong" && {
						width: theme.dimensions.width * 0.9,
						backgroundColor: "#D05353",
					},
				]}
				disabled={disabled || isPending}
				onPress={primaryRedirect}>
				{isPending ? (
					<ActivityIndicator size='small' />
				) : (
					<Text style={style.primaryButtonTxt}>{title}</Text>
				)}
			</TouchableOpacity>
		);
	}
};

export default Buttons;
