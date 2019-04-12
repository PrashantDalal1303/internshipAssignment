The following are the 3 funtions that are used in the app.js file 

get("/ascendingorder")
    This function listens to the ascendingorder call and then fetches all the songs in the database, these 
songs are then sorted using the "sort" extension. The sorting is done in ascending order on the year parameter 
that is stored for every song record.

get("/famousSong")
    This function is used to get those songs that are sung by famous artists. It gets all the songs in the database and 
populates their respective artist links. The loop then iterates through each item to check if the isFamous attribute is true or not 
in case the attribute is true, the record is added to a new array which is passed ot the rendering engine.

post("/:id/new")
    This is used to post a new comment for a particular song whose id is present in the url. The callback function gets that particular 
song record and itterates through all its comments and checks there is an old comment posted by the same user.
Here we asume that the username is passed to us in the request body, while in most practical cases we may use passports, sessions and then
use req.user to get the user details.
    The middleware checks this loop on the function's behalf and if there is a comment present it send back a message and doesnt invoke the callback.

The three files present in the models directory are to provide the database schema.
