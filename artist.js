//CREATES A ARTIST MODEL

const mongoose = require("mongoose");

var artistSchaema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    isFamous : Boolean
})

module.exports = mongoose.model("artist", artistSchaema);