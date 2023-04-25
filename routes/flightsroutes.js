const express = require("express")
const flightRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { model } = require("mongoose");
const { FlightModel } = require("../model/flight.model");
const { BookingModel } = require("../model/booking.model");



flightRouter.get("/flights",async(req,res)=>{
    let find = await FlightModel.find({});
    if(!!find){
        res.status(200).send({msg:"all flights..",find});
    }else{
        res.send(({msg:"server error"}))
    }
})
// by id
flightRouter.get("/flights/:id",async(req,res)=>{
    let find = await FlightModel.find({_id:req.params.id});
    if(!!find){
        res.status(200).send({msg:"flights..",find});
    }else{
        res.send(({msg:"server error"}))
    }
})
// post flights
flightRouter.post("/flights",async(req,res)=>{
    try {
        let flightData = req.body;
        let flight = new FlightModel(flightData);
       let newOne =  await flight.save();
        res.status(201).send({msg:"flight has been added successfully",newOne})
    } catch (error) {
        res.send('server errror while adding flights to the system')
        console.log(error);
    }
})
// patch flights
flightRouter.patch("/flights/:id",async(req,res)=>{
    let id = req.params.id;
    let payload = req.body;
      try {
        let find = await FlightModel.findOne({_id:id});
        if(find){
          let updateInfo = await FlightModel.findByIdAndUpdate({_id:id},payload);
           res.status(202).send({msg:"flight details has been updated",updateInfo});
        }else{
             res.send({msg:"flight not found..."})
        }
      } catch (error) {
        res.send({msg:"server error"});
        console.log(error);
      }
})
// delete flights
flightRouter.delete("/flights/:id",async(req,res)=>{
    let id = req.params.id;
      try {
        let find = await FlightModel.findOne({_id:id});
        if(find){
          let deleted = await FlightModel.findByIdAndDelete({_id:id});
           res.status(202).send({msg:"flight has been deleted",deleted});
        }else{
             res.send({msg:"flight not found..."})
        }
      } catch (error) {
        res.send({msg:"server error"});
        console.log(error);
      }
})

// book the flights..
flightRouter.post("/booking/:id",async(req,res)=>{
    let userID = req.body.userID;
    try {
        let find = await FlightModel.findOne({_id:req.params.id});
        if(find){
          let book = new BookingModel({userID,flightID:find._id});
          await book.save();
          res.status(201).send({msg:"booked",book});
        }
    } catch (error) {
        res.send({msg:"server error"});
        console.log(error);
    }
})
// dashboard
flightRouter.get("/dashboard",async(req,res)=>{
    try {
          let bookings = await BookingModel.find({});
          res.status(200).send({msg:"all booked flights",bookings});
        
    } catch (error) {
        res.send({msg:"server error"});
        console.log(error);
    }
})


module.exports = {
    flightRouter
}