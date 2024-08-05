const express = require("express")
const tokens = express.Router()
const db = require("../db/conn.js")

tokens.post('/', async (req,res) => {
    let user = req.body.name

    if(user){
        try {
            let u_ID = await db.GetUserID(user)

            let queryResult = await db.GetTokenTotal(u_ID)

            res.json(queryResult)
            console.log("Tokens total sent!!")
          } catch (error) {
            console.error(error)
            res.sendStatus(500)
          }
    }
})




module.exports=tokens