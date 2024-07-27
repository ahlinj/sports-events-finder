const express = require("express")
const events = express.Router()
const db = require("../db/conn.js")

//Gets all the events in the DB 
events.get('/', async (req,res, next)=>{
    try{
        let queryResult=await db.allEvents();
        res.json(queryResult)
        console.log(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
})


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
         let organizationID = await db.GetOrganizationID(organization);
         if (!organizationID) {
            console.log("Organization not found!");
            res.status(404).send("Organization not found");
            return;
         }

         let queryResult=await db.AddEvent(name,description,location,dateTime,organizationID);
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
