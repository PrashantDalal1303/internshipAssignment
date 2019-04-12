//CREATES THE SONG MODEL, ARTIST LINKS TO AN OBJECT STORED IN ARTIST TABLE/RELATION
//COMMENT IS AN ARRAY THAT STORES ALL THE COMMENTS... USEFUL ONLY FOR SMALL PROJECTS 
//MUST HAVE A SEPERATE MODEL TO MAKE IT SCALEABLE

const mongoose = require("mongoose");

var songSchaema = new mongoose.Schema({
    title : String,
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "artist"
    },
    albumName : String,
    genre : String,
    comment :[{
        userFirstName : String,
        userLastName : String,
        content : String
    }],
    year : Number
})

module.exports = mongoose.model("song", songSchaema);