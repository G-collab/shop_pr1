"use strict";
const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/user");

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("DBconnected"))
.catch((err) => {
    console.log(err);
});
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is on");
});

