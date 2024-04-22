// Message.js
import React from "react";
import { styles } from "../styles";
import { useTheme } from "@react-navigation/native";
import { View, Text, Image } from "react-native";

import formatLastMessageDate from "../functions/formatLastMessageDate";

const Message = ({ text, time, incoming, fullName }) => {
	const theme = useTheme();
	const style = styles(theme);
	return (
		<View style={[style.messageRow, !incoming ? style.sentMessageRow : ""]}>
			<View
				style={[
					style.messageBubble,
					incoming ? style.receivedMessage : style.sentMessage,
				]}>
				<Text
					style={[
						style.messageSender,
						{ color: incoming ? theme.colors.primary : theme.colors.accent },
					]}>
					{fullName}
				</Text>
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
