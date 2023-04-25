const mongoose = require('mongoose')
const express = require("express")

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});
const UserModel = mongoose.model('users',userSchema);

module.exports = {
    UserModel
}
