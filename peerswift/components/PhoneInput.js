import React, { useState, useEffect, useRef } from "react";
import { TextInput, Text, View, Animated, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { styles } from "../styles";

const PhoneInput = ({ value, onChange, inputType }) => {
	const theme = useTheme();
	const style = styles(theme);
	const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		Animated.timing(anim, {
			toValue: value ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [value, anim]);

	const labelStyle = {
		position: "absolute",
		left: theme.dimensions.width * 0.24,
		backgroundColor: theme.colors.background,
		top: anim.interpolate({
			inputRange: [0, 1],
			outputRange: [12, -8],
		}),
		fontSize: anim.interpolate({
			inputRange: [0, 1],
			outputRange: [16, 15], // Adjust font size as needed
		}),
		color: anim.interpolate({
			inputRange: [0, 1],
			outputRange: ["#313131", theme.colors.accent], // Adjust color as needed
		}),
	};

	const handleChange = (value) => {
		onChange(value);
	};

	return (
		<View
			style={[
				style.phoneInput,
				{
					borderColor: isFocused ? theme.colors.primary : theme.colors.accent,
					borderWidth: isFocused ? 2 : 1,
				},
			]}>
			<View
				style={[
					style.flagBox,
					{
						borderColor: isFocused ? theme.colors.primary : theme.colors.accent,
						borderRightWidth: isFocused ? 2 : 1,
					},
				]}>
				<Image
					source={{ uri: "https://flagcdn.com/w320/cy.png" }}
					style={style.phoneFlag}
				/>
			</View>
			<Animated.Text style={labelStyle}>Phone Number</Animated.Text>
			<TextInput
				keyboardType={inputType}
				value={value}
				onChangeText={handleChange}
				placeholder={value ? "" : ""}
				showSoftInputOnFocus={false}
				style={{
					height: theme.dimensions.height * 0.05,
					color: theme.colors.text,
					flex: 3,
					paddingLeft: theme.dimensions.width * 0.04,
				}}
				onFocus={() => {
					if (!value) {
						anim.setValue(1);
					}
					setIsFocused(true);
				}}
				onBlur={() => {
					if (!value) {
						anim.setValue(0);
					}
				}}
			/>
		</View>
	);
};

export default PhoneInput;
