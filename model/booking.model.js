
const mongoose = require('mongoose')
const express = require("express")

const bookingSchema = mongoose.Schema({
    userID:{
        type:String
    },
    flightID:{
        type:String
    }
});
const BookingModel = mongoose.model('booking',bookingSchema);

module.exports = {
    BookingModel
}
// {
//     _id: ObjectId,
//     user : { type: ObjectId, ref: 'User' },
//     flight : { type: ObjectId, ref: 'Flight' }
// }