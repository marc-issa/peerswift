import { useState, useEffect, useRef } from "react";

// Styles import
import { styles } from "../../styles";
import { useTheme } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Modal, Animated } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

// Functions import
import isSameDay from "../../functions/isSameDay";

const CalendarInput = ({ isEmpty, value, onChange }) => {
	const theme = useTheme();
	const style = styles(theme);

	const [date, setDate] = useState(value || new Date());

	const [show, setShow] = useState(false);
	const [selectedDate, setSelectedDate] = useState(isEmpty);

	const anim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		Animated.timing(anim, {
			toValue: isFocused ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [value, isFocused, anim]);

	const labelStyle = {
		position: "absolute",
		left: theme.dimensions.width * 0.075,
		backgroundColor: theme.colors.background,
		top: anim.interpolate({
			inputRange: [0, 1],
			outputRange: [
				theme.dimensions.height * 0.018,
				-theme.dimensions.height * 0.009,
			],
		}),
		fontSize: anim.interpolate({
			inputRange: [0, 1],
			outputRange: [16, 15], // Adjusted font size for floated label
		}),
		color: anim.interpolate({
			inputRange: [0, 1],
			outputRange: ["#313131", theme.colors.accent], // Adjust color as needed
		}),
	};

	const showDatepicker = () => {
		setShow(!show);
	};

	const closeModal = (type) => {
		if (type === "clear") {
			setDate(new Date());
			onChange(new Date());
			setSelectedDate(true);
		} else {
			onChange(date);
			setSelectedDate(false);
		}
		setShow(false);
	};

	const handleDateSelect = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const displayDate = selectedDate ? "" : date.toLocaleDateString();

	useEffect(() => {
		if (!isSameDay(date, new Date()) || show) {
			setIsFocused(true);
		} else {
			setIsFocused(false);
		}
	}, [date, show]);

	return (
		<View>
			<TouchableOpacity
				onPress={showDatepicker}
				style={[
					style.dateInput,
					{
						borderColor: isFocused ? theme.colors.primary : theme.colors.accent,
						borderWidth: isFocused ? 1.5 : 1,
					},
				]}>
				<Animated.Text
					style={[
						labelStyle,
						{
							backgroundColor: theme.colors.background,
							color: isFocused ? theme.colors.primary : theme.colors.accent,
						},
					]}>
					Date of Birth
				</Animated.Text>
				{(show || !isSameDay(date, new Date())) && (
					<Text style={style.dateText}>{displayDate}</Text>
				)}
			</TouchableOpacity>
			{show && theme.os === "ios" && (
				<>
					<Modal animationType='slide' transparent={true}>
						<View style={style.datePickerModal}>
							<View style={style.datePickerContainer}>
								<View
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}>
									<TouchableOpacity onPress={() => closeModal("clear")}>
										<Text
											style={{
												fontSize: 17,
												color: theme.colors.primary,
											}}>
											Cancel
										</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => closeModal()}>
										<Text
											style={{
												fontSize: 17,
												color: theme.colors.primary,
											}}>
											Done
										</Text>
									</TouchableOpacity>
								</View>

								<RNDateTimePicker
									value={date}
									maximumDate={new Date()}
									minimumDate={new Date(1930, 12, 31)}
									mode='date'
									display='spinner'
									onChange={handleDateSelect}
									textColor={theme.colors.accent}
								/>
							</View>
						</View>
					</Modal>
				</>
			)}
			{show && theme.os !== "ios" && (
				<RNDateTimePicker
					value={date}
					maximumDate={new Date()}
					minimumDate={new Date(1930, 12, 31)}
					mode='date'
					display='spinner'
					onChange={handleDateSelect}
					textColor={theme.colors.accent}
				/>
			)}
		</View>
	);
};

export default CalendarInput;
