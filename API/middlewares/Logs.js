module.exports = {
	logger: (req, res, next) => {
		console.log("Headers:", req.headers);
		console.log("Body:", req.body);
		next();
	},
};
