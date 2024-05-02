import { useState, useEffect, useRef } from "react";
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

// Send message to group chat
import SendMessage from "../api client/groups/SendMessage";

const GroupChat = ({ navigation, route }) => {
	const theme = useTheme();
	const style = styles(theme);

	const group = route.params.group;

	const scrollViewRef = useRef();

	const [messageText, setMessageText] = useState("");

	const handleSendMessage = () => {
		SendMessage(group.group.id, messageText).then((response) => {
			if (response.status === "success") {
				setMessageText("");
				setMessages([response.data.messages, ...messages]);
			} else {
				console.error(response.message);
			}
		});
	};

	const [messages, setMessages] = useState(group.messages);

	// Scroll to bottom on new messages
	useEffect(() => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollToEnd({ animated: true });
		}
	}, [messages]);

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
							source={{ uri: group.country.flag }}
							style={style.groupChatIcon}
						/>
						<Text style={style.groupChatName}>{group.group.name}</Text>
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			</View>
			<ScrollView
				style={style.messagesContainer}
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({ animated: false })
				}>
				{[...messages].reverse().map((message) => (
					<Message
						key={message.id}
						text={message.message}
						time={message.timestamp}
						incoming={message.incoming}
						fullName={message.sender.full_name}
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
