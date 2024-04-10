const formatMessage = (text) => {
	// function that will shorten the message to 50 characters and add "..." at the end
	if (text.length > 50) {
		return text.slice(0, 50) + "...";
	} else {
		return text;
	}
};

export default formatMessage;
