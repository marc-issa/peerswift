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
					screen === "AmountReceived" && {
						width: theme.dimensions.width * 0.9,
						backgroundColor: "#06A77D",
					},
					screen === "CancelShort" && {
						width: theme.dimensions.width * 0.44,
						backgroundColor: "#D05353",
					},
					screen === "AmountSent" && {
						width: theme.dimensions.width * 0.44,
						backgroundColor: "#06A77D",
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
