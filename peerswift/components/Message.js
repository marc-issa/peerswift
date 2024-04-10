// Message.js
import React from "react";
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";
import { View, Text, Image } from "react-native";

const Message = ({ text, time, incoming }) => {
	const theme = useTheme();
	const style = styles(theme);
	return (
		<View style={[style.messageRow, !incoming ? style.sentMessageRow : ""]}>
			<Image
				source={{ uri: "https://flagcdn.com/w320/cy.png" }}
				style={{
					width: 36,
					height: 36,
					borderRadius: 100,
					marginBottom: 5,
					marginLeft: 5,
				}}
			/>
			<View
				style={[
					style.messageBubble,
					incoming ? style.receivedMessage : style.sentMessage,
				]}>
				<Text style={style.messageText}>{text}</Text>
				<Text style={style.messageTime}>{time}</Text>
			</View>
		</View>
	);
};

export default Message;
