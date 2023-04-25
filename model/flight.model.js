
const mongoose = require("mongoose");
const express = require("express");

const flightSchema = mongoose.Schema({
  airline: {
    type: String,
  },
  flightNo: {
    type: String,
  },
  departure: {
    type: String,
  },
  arrival: {
    type: String,
  },
  departureTime: Date,
  arrivalTime: Date,
  seats: {
    type: Number,
  },
  price: {
    type: Number,
  },
});
const FlightModel = mongoose.model("flights", flightSchema);

module.exports = {
    FlightModel
};



// {
//     _id: ObjectId,
//     airline: String,
//     flightNo: String,
//     departure: String,
//     arrival: String,
//     departureTime: Date,
//     arrivalTime: Date,
//     seats: Number,
//     price: Number
//   }