const express = require("express")
const events = express.Router()
const db = require("../db/conn.js")

//Inserts a new event in our database id field are complete
events.post('/', async (req, res) => {
    
    let name = req.body.name
    let description = req.body.description
    let location = req.body.location
    let dateTime = req.body.dateTime
    let organization = req.body.organization
    if (name && description && location && dateTime && organization) 
    {
        try
        {
         let queryResult=await db.AddEvent(name,description,location,dateTime,organization);
         if (queryResult.affectedRows) {
            console.log("New event added!!")
          }
               
        }
        catch(err){
            console.log("Error:"+err)
            res.sendStatus(500)
        }    
    }
    else
    {
        console.log("A field is missing!")
    }

    res.end();

    
});

module.exports=events
