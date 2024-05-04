require("dotenv").config();

var os = require("os");

var networkInterfaces = os.networkInterfaces();

function logIPv4Addresses() {
	Object.keys(networkInterfaces).forEach((interfaceName) => {
		networkInterfaces[interfaceName].forEach((interface) => {
			if (
				"IPv4" === interface.family &&
				!interface.internal &&
				(interfaceName === "Wi-Fi" || interfaceName === "Ethernet")
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
const requestsRouter = require("./routes/Requests");
const transactionRouter = require("./routes/Transactions");
const sendRouter = require("./routes/Send");
const topupRouter = require("./routes/Topup");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/countries", countriesRouter);
app.use("/groups", groupsRouter);
app.use("/request", requestsRouter);
app.use("/transaction", transactionRouter);
app.use("/send", sendRouter);
app.use("/topup", topupRouter);

app.listen(port, () => {
	logIPv4Addresses();
});
