const express = require("express")
const prizes = express.Router()
const db = require("../db/conn.js")

prizes.get('/', async (req,res, next)=>{
    try{
        let queryResult=await db.allTokensAllUsers()
        res.json(queryResult)
        console.log(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
})

//retrieves prizes from the current month
prizes.get('/get', async (req,res, next)=>{
    try{
        let queryResult=await db.allPrizesAllUsers()
        res.json(queryResult)
        console.log(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
})

prizes.post('/add', async (req,res, next)=>{
    let value = req.body.value
    let sponsor = req.body.sponsor

    if (value && sponsor) 
        {
            try
            {
             let queryResult=await db.AddPrize(value,sponsor)
             if (queryResult.affectedRows) {
                console.log("New prize added!!")
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
})


module.exports = prizes