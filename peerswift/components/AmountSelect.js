import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const AmountSelect = ({ value, onChange }) => {
	const theme = useTheme();
	const style = styles(theme);

	const defaultAmmounts = [50, 100, 200, 500, 1000];

	const handleAmountChange = (ammount) => {
		if (ammount < 0) return;
		if (ammount === 0 || ammount === "") {
			onChange(0);
			return;
		}
		if (ammount > 0) {
			const tmp_ammount = parseFloat(ammount);
			onChange(tmp_ammount);
		}
	};
	return (
		<View style={style.amountSelectBox}>
			<View style={style.amountActionBox}>
				<TouchableOpacity
					style={style.amountAddSubstract}
					onPress={() => handleAmountChange(value - 50)}>
					<Text style={style.amountAddSubstractTxt}>-</Text>
				</TouchableOpacity>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						maxWidth: theme.dimensions.width * 0.5,
						width: theme.dimensions.width * 0.4,
					}}>
					<Text
						style={{
							color: theme.colors.accent,
							fontSize: 32,
							fontWeight: "bold",
						}}>
						USD{" "}
					</Text>
					<TextInput
						style={style.amountTxt}
						value={`${value}`}
						onChangeText={handleAmountChange}
						keyboardType='phone-pad'></TextInput>
				</View>
				<TouchableOpacity
					style={style.amountAddSubstract}
					onPress={() => handleAmountChange(value + 50)}>
					<Text style={style.amountAddSubstractTxt}>+</Text>
				</TouchableOpacity>
			</View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={{
					width: theme.dimensions.width * 0.9,
					marginTop: 20,
				}}>
				{defaultAmmounts.map((item, index) => (
					<TouchableOpacity
						key={index}
						style={style.amountSelect}
						onPress={() => handleAmountChange(item)}>
						<Text style={style.amountSelectTxt}>{item}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default AmountSelect;
