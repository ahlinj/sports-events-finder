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


module.exports = prizes