/////////////////////////////////////////////////////////////////////
// IS THE MAIN SOURCE FILE THAT HAS FUNCTIONS TO LISTEN FOR CALLS TO 
//GET ALL SONGS, ADDA COMMENT, AND GET FAMOUS SONGS
//////////////////////////////////////////////////////////////////////

const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const user = require("./models/user");
const artist = require("./models/artist");
const song = require("./models/song");

app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost:27017/InternAssign", { useNewUrlParser: true, useCreateIndex : true });           //connects to the database


//USES A GET REQUEST TO RECIEVE ALL SONGS IN ASCENDING ORDER OF THEIR RELEASE YEAR USING SORT EXTENSION/OPTION
app.get("/ascendingYear", (req, res)=>{ 
    song.find().sort({year : 1}).exec((err, data) => {
        if(!err){
            console.log(data);
        }
    });
});


//GET REQUEST TO GET THE SONGS SUNG ONLY BY FAMOUS ARTISTS  
app.get("/getFamousSong", (req, res) => {
    song.find().populate("artist").exec((err, data) => {                        //populate the artiest and then selectively add those items to 
        if(!err){                                                               // working array that are sung by famous artists... this is passed
            var a = new Array();                                                //to the rendering engine
            for( var i = 0; i < data.length; i++){                                                  
                if ( data[i].artist.isFamous ) {
                    a.push(data[i]);
                }
            }
            console.log(a);
        }
    });
});


//post request to add a new comment as per REST API
// few assumptions are wrt the firstName, lastName and content be sent by body
//info about the user can often be taken from req.user if we use sessions
app.post("/:id/comment/new", checkPresence, (req, res) =>{
    var flag = true;
    song.findById(mongoose.Types.ObjectId(req.params.id)  , (err, data) => {
        if(err){
            console.log("there was some error in finding the data");
            return err;
        } else {
            data.comment.push({ userFirstName : req.body.firstName , userLastName : req.body.lastName, content : req.body.content });
            data.save();
        }
    });
});

    
//middleware to check if the user has already posted a comment 
//if the user has posted a comment a message is sent back else the comment is added 
function checkPresence(req, res, next){
    song.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if(err){
            console.log("there was some error in finding the data");
            res.send("cant add another comment");
            return ;
        } else {
            data.comment.forEach(element => {
                if((element.userFirstName == req.body.firstName) && (element.userLastName == req.body.lastName))
                    return null;
            });
            next();
        }
    });
};


app.listen(4000, ()=>{
    console.log("this is ok");
})