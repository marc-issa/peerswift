require("dotenv").config();
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

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
