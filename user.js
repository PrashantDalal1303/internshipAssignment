//CREATES THE USER MODEL 

const mongoose = require("mongoose");

var userSchaema = new mongoose.Schema({
    firstName : String,
    lastName : String
})

module.exports = mongoose.model("user", userSchaema);