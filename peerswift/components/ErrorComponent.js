import React from "react";
import { Modal, View, Text, Image } from "react-native";

// Style imports
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";

const ErrorModal = ({ isVisible, message, onClose }) => {
	const theme = useTheme();
	const style = styles(theme);

	return (
		<Modal animationType='slide' transparent={true} visible={isVisible}>
			<View style={style.centeredView}>
				<View style={style.modalView}>
					<Image
						style={style.modalImage}
						source={require("../assets/Icons/warning.png")}
					/>
					<Text style={style.modalText}>{message}</Text>
				</View>
			</View>
		</Modal>
	);
};

export default ErrorModal;
