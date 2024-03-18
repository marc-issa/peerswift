require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Routes
const userRouter = require("./routes/User");

app.use("/user", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
