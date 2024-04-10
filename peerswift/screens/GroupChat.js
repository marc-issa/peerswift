import { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { styles } from "../styles";

// Components import
import Message from "../components/Message";

const GroupChat = ({ navigation }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [messageText, setMessageText] = useState("");

	const handleSendMessage = () => {
		console.log("Message to send:", messageText);
		setMessageText("");
	};

	// Dummy data for messages
	const messages = [
		{
			id: 1,
			text: "Hello there! I will be traveling to from Canada to Lebanon next week! if you are interested please feel free to reach out.",
			time: "9:34 PM",
			incoming: false, // false for sent messages, true for received ones
		},
		{
			id: 2,
			text: "Hello there! I will be traveling to from Canada to Lebanon next week! if you are interested please feel free to reach out.",
			time: "9:34 PM",
			incoming: true, // false for sent messages, true for received ones
		},
		// Add more messages here
	];

	return (
		<KeyboardAvoidingView
			behavior={theme.os === "ios" ? "padding" : "height"}
			style={style.container}>
			<View style={style.chatHeaderBG}>
				<View style={style.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Image
							source={require("../assets/Icons/back.png")}
							style={style.backButton}
						/>
					</TouchableOpacity>
					<View style={style.groupChatHeader}>
						<Image
							source={{ uri: "https://flagcdn.com/w320/cy.png" }}
							style={style.groupChatIcon}
						/>
						<Text style={style.groupChatName}>Cyprus</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
			<ScrollView style={style.messagesContainer}>
				{messages.map((message) => (
					<Message
						key={message.id}
						text={message.text}
						time={message.time}
						incoming={message.incoming}
					/>
				))}
			</ScrollView>
			<View style={style.inputArea}>
				<TextInput
					style={style.messageInput}
					value={messageText}
					onChangeText={setMessageText}
					placeholder='Type a message...'
					placeholderTextColor={theme.colors.placeholder}
				/>
				<TouchableOpacity onPress={handleSendMessage} style={style.sendButton}>
					<Image
						source={require("../assets/Icons/send.png")}
						style={style.sendIcon}
					/>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default GroupChat;
