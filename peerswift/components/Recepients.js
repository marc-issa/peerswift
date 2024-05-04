import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

// Import your styles
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const Recepients = ({ recepients, value, onChange }) => {
	const theme = useTheme();
	const style = styles(theme);

	const handleOnChange = (contact) => {
		if (value === contact) {
			onChange(null);
			return;
		}
		onChange(contact);
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
							onPress={() => handleOnChange(item)}
							key={index}
							style={style.recepientItem}>
							<Image
								source={{ uri: item.contact.country.flag }}
								style={[
									style.recepientImage,
									{ borderWidth: value && value.id === item.id ? 3 : 0 },
								]}
							/>
							<Text
								style={[
									style.recepientText,
									{
										color:
											value && value.id === item.id
												? theme.colors.primary
												: theme.colors.accent,
									},
								]}>
								{item.contact.full_name}
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
