require("./db/connection");
require("dotenv").config();
const port = process.env.PORT || 3888;
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routers/userRouter");

app.use(express.json());
app.use(cookieParser);

app.use("/api", userRouter);

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});