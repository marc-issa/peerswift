import { useEffect, useState } from "react";

import { styles } from "../../styles";
import { useTheme } from "@react-navigation/native";

import { View } from "react-native";

const PinInput = ({ pinCode }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [pin, setPin] = useState(pinCode);

	useEffect(() => {
		setPin(pinCode);
	}, [pinCode]);

	return (
		<View style={style.pinInpContainer}>
			{[...Array(6)].map((_, index) => {
				return (
					<View
						style={index < pin.length ? style.pinInpBoxFill : style.pinInpBox}
						key={index}></View>
				);
			})}
		</View>
	);
};

export default PinInput;
