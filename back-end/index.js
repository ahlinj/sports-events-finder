const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const port = 5000
const users = require("./routes/users.js")

app.get("/",(req,res)=>{
res.send("hola")
})

app.use("/users",users)

///App listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})
