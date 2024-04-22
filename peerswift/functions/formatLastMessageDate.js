const formatLastMessageDate = (dateString) => {
	const date = new Date(dateString);
	const now = new Date();

	// Create copies of now and date to use for date-only comparison
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const messageDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	);

	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (messageDate.getTime() === today.getTime()) {
		// If the message was sent today, show the time correctly formatted
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours}:${minutes.toString().padStart(2, "0")}`;
	} else if (messageDate.getTime() === yesterday.getTime()) {
		// If the message was sent yesterday, show 'Yesterday'
		return "Yesterday";
	} else {
		// Otherwise, show the date in mm/dd format
		return `${date.getMonth() + 1}/${date.getDate()}`;
	}
};

export default formatLastMessageDate;
