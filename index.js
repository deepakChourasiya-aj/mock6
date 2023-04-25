const express = require("express");
const mongoose = require("mongoose");
const { connection } = require("./config/db");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { UserModel } = require("./model/user.model");
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("./middlewares/authenticator");
const { FlightModel } = require("./model/flight.model");
const { BookingModel } = require("./model/booking.model");
const { userRouter } = require("./routes/userroutes");
const { flightRouter } = require("./routes/flightsroutes");

app.get("/", (req, res) => {
  res.send("okk");
});

app.use("/api",userRouter)

app.use(authenticator);

app.use("/api",flightRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db " + process.env.PORT);
  } catch (error) {
    console.log("errr in connecting to db..");
  }
});




















// "airline":"Indian Airline",
// "flightNo":"B201",
// "departure":"Mumbai",
// "arrival":"Bangalore",
// "departureTime":,
// "arrivalTime":,
// "seats":120,
// "price":500,


// airline: {
//     type: String,
//   },
//   flightNo: {
//     type: String,
//   },
//   departure: {
//     type: String,
//   },
//   arrival: {
//     type: String,
//   },
//   departureTime: {
//     type: Date,
//   },
//   arrivalTime: {
//     type: Date,
//   },
//   seats: {
//     type: Number,
//   },
//   price: {
//     type: Number,
//   },