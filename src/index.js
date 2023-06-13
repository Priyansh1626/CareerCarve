require("./db/connection");
require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");

app.use(express.json());

app.use("/api", userRouter);

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});