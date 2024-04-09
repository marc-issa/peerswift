import { useEffect, useState, useRef } from "react";
// Style imports
import { styles } from "../../styles";
import { useTheme } from "@react-navigation/native";

import { View, TextInput, Text, Animated } from "react-native";

const Input = ({ value, onChange, title }) => {
	const theme = useTheme();
	const style = styles(theme);

	const anim = useRef(new Animated.Value(value || isFocused ? 1 : 0)).current;
	const [isFocused, setIsFocused] = useState(false);

	const handleInputChange = (text) => {
		onChange(text);
	};

	useEffect(() => {
		Animated.timing(anim, {
			toValue: value || isFocused ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [value, isFocused, anim]);

	const labelStyle = {
		position: "absolute",
		left: theme.dimensions.width * 0.075,
		backgroundColor: theme.colors.background,
		top: anim.interpolate({
			inputRange: [0, 1],
			outputRange: [
				theme.dimensions.height * 0.018,
				-theme.dimensions.height * 0.009,
			],
		}),
		fontSize: anim.interpolate({
			inputRange: [0, 1],
			outputRange: [16, 15], // Adjusted font size for floated label
		}),
		color: anim.interpolate({
			inputRange: [0, 1],
			outputRange: ["#313131", theme.colors.accent], // Adjust color as needed
		}),
	};

	return (
		<View
			style={[
				style.input,
				(isFocused || value) && {
					borderColor: theme.colors.primary,
					borderWidth: 1.5,
				},
			]}>
			<Animated.Text
				style={[
					labelStyle,
					{
						backgroundColor: theme.colors.background,
						color:
							isFocused || value ? theme.colors.primary : theme.colors.accent,
					},
				]}>
				{title}
			</Animated.Text>
			<TextInput
				value={value}
				onChangeText={handleInputChange}
				placeholder={""}
				style={{
					height: theme.dimensions.height * 0.055,
					color: theme.colors.text,
					flex: 3,
					paddingLeft: theme.dimensions.width * 0.07,
					fontSize: 16,
				}}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</View>
	);
};

export default Input;
