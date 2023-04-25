const express = require("express")
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { model } = require("mongoose");
const { UserModel } = require("../model/user.model");


// api/register
userRouter.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    try {
      bcrypt.hash(password, 5, async function (err, hash_pass) {
        if (err) {
          res.send({ msg: "error while registeration." });
        } else {
          let user = new UserModel({ name, email, password: hash_pass });
          await user.save();
          res.status(201).send({ msg: "user has been registered", user });
        }
      });
    } catch (error) {
      res.send({ msg: "server errro" });
      console.log("error in registration..");
    }
  });
  // api/login;
  userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
      let findUser = await UserModel.findOne({ email });
  
      if (findUser) {
        bcrypt.compare(password, findUser.password, async function (err, result) {
          if (err) {
            res.send({ msg: "wrong password" });
          } else {
            let userID = findUser._id;
            let token = jwt.sign({ userID: userID }, "deepak");
            res.cookie("token", token, { httpOnly: true, maxAge: 200000000000 });
            res.status(201).send({ msg: "user has been logged in successfully" });
          }
        });
      }else{
          res.send({msg:"userr not found.."})
      }
    } catch (error) {
      res.send({msg:"server error."})
      console.log(error);
    }
  });

  module.exports = {
    userRouter
  }