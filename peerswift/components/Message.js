// Message.js
import React from "react";
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";
import { View, Text, Image } from "react-native";

import formatLastMessageDate from "../functions/formatLastMessageDate";

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
				<Text
					style={[style.messageText, !incoming ? style.sentMessageTxt : ""]}>
					{text}
				</Text>
				<Text
					style={[
						style.messageTime,
						{ color: incoming ? theme.colors.accent : theme.colors.background },
					]}>
					{formatLastMessageDate(time)}
				</Text>
			</View>
		</View>
	);
};

export default Message;
