import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const Recepients = ({ recepients, value, onChange }) => {
	const theme = useTheme();
	const style = styles(theme);

	const handleOnChange = (id) => {
		if (value === id) {
			onChange(null);
			return;
		}
		onChange(id);
	};
	return (
		<View style={style.recepientsBox}>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={{
					width: theme.dimensions.width * 0.9,
					marginTop: 20,
				}}>
				{recepients.map((item, index) => {
					return (
						<TouchableOpacity
							onPress={() => handleOnChange(item.id)}
							key={index}
							style={style.recepientItem}>
							<Image
								source={{ uri: item.country_flag }}
								style={[
									style.recepientImage,
									{ borderWidth: value === item.id ? 3 : 0 },
								]}
							/>
							<Text
								style={[
									style.recepientText,
									{
										color:
											value === item.id
												? theme.colors.primary
												: theme.colors.accent,
									},
								]}>
								{item.name}
							</Text>
							<Text
								style={[
									style.recepientText,
									{
										color:
											value === item.id
												? theme.colors.primary
												: theme.colors.accent,
									},
								]}>
								{item.rating}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default Recepients;
