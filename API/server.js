require("dotenv").config();

var os = require("os");

var networkInterfaces = os.networkInterfaces();

function logIPv4Addresses() {
	Object.keys(networkInterfaces).forEach((interfaceName) => {
		networkInterfaces[interfaceName].forEach((interface) => {
			if (
				"IPv4" === interface.family &&
				!interface.internal &&
				interfaceName === "Wi-Fi"
			) {
				console.log(`Server running on: http://${interface.address}:${port}`);
			}
		});
	});
}

const logs = require("./middlewares/Logs");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(logs.logger);

// Routes
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/User");
const countriesRouter = require("./routes/Countries");
const groupsRouter = require("./routes/Groups");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/countries", countriesRouter);
app.use("/groups", groupsRouter);

app.listen(port, () => {
	logIPv4Addresses();
});
