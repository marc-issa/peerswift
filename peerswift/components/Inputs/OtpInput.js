import { useState, useEffect } from "react";
// Style imports
import { styles } from "../../styles";
import { useTheme } from "@react-navigation/native";

import { View, TextInput } from "react-native";

const OtpInput = ({ otpCode, onChange }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [isFocused, setIsFocused] = useState(false);

	const handleChange = (value) => {
		onChange(value);
	};

	useEffect(() => {
		if (otpCode.length > 0) {
			setIsFocused(true);
		} else {
			setIsFocused(false);
		}
	}, [otpCode]);

	const inputs = [];

	return (
		<View style={style.otpContainer}>
			{Array.from({ length: 6 }, (_, index) => (
				<TextInput
					ref={(ref) => (inputs[index] = ref)}
					key={index}
					style={[
						style.otpBox,
						isFocused && {
							borderColor: theme.colors.primary,
							borderWidth: 1.5,
						},
					]}
					maxLength={1}
					keyboardType='number-pad'
					onChangeText={handleChange}
					value={otpCode[index]}
					showSoftInputOnFocus={false}
				/>
			))}
		</View>
	);
};

export default OtpInput;
