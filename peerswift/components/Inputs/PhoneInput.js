import React, { useState, useEffect, useRef } from "react";
import {
	TextInput,
	View,
	Animated,
	Image,
	ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const PhoneInput = ({ navigation, value, onChange, flag }) => {
	const theme = useTheme();
	const style = styles(theme);
	const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
	const [isFocused, setIsFocused] = useState(false);

	const [flagUrl, setFlagUrl] = useState("");

	useEffect(() => {
		if (flag) {
			setFlagUrl(flag);
		}
	}, [flag]);

	useEffect(() => {
		if (value) {
			setIsFocused(true);
		}
	}, [value]);

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
			outputRange: [15, -8],
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
				style.input,
				{
					borderColor: isFocused ? theme.colors.primary : theme.colors.accent,
					borderWidth: isFocused ? 1.5 : 1,
				},
			]}>
			<TouchableOpacity
				style={[
					style.flagBox,
					{
						borderColor: isFocused ? theme.colors.primary : theme.colors.accent,
						borderRightWidth: isFocused ? 1.5 : 1,
					},
				]}
				onPress={() => navigation.navigate("Countries", { type: "phone" })}>
				{flagUrl ? (
					<Image source={{ uri: flagUrl }} style={style.phoneFlag} />
				) : (
					<ActivityIndicator size='small' />
				)}
			</TouchableOpacity>
			<Animated.Text style={labelStyle}>Phone Number</Animated.Text>
			<TextInput
				keyboardType={"phone-pad"}
				value={value}
				onChangeText={handleChange}
				placeholder={value ? "" : ""}
				showSoftInputOnFocus={false}
				editable={false}
				style={{
					height: theme.dimensions.height * 0.055,
					color: theme.colors.text,
					flex: 3,
					paddingLeft: theme.dimensions.width * 0.04,
					fontSize: 16,
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
