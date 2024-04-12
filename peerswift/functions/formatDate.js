const formatDate = (isoDateString) => {
	const date = new Date(isoDateString);
	const now = new Date();
	const diffTime = Math.abs(now - date);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 1) {
		const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
		if (diffHours < 1) {
			const diffMinutes = Math.ceil(diffTime / (1000 * 60));
			return diffMinutes <= 1 ? "just now" : `${diffMinutes} minutes ago`;
		}
		return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
	} else if (diffDays === 1) {
		return "yesterday";
	} else if (diffDays < 7) {
		return `${diffDays} days ago`;
	} else if (diffDays < 30) {
		return `${Math.ceil(diffDays / 7)} week${
			Math.ceil(diffDays / 7) === 1 ? "" : "s"
		} ago`;
	} else if (diffDays < 365) {
		return `${Math.ceil(diffDays / 30)} month${
			Math.ceil(diffDays / 30) === 1 ? "" : "s"
		} ago`;
	} else {
		return `${Math.ceil(diffDays / 365)} year${
			Math.ceil(diffDays / 365) === 1 ? "" : "s"
		} ago`;
	}
};

export default formatDate;
