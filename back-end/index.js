const express = require('express')
const dotenv = require('dotenv')
const cors=require("cors")
const cookieParser = require("cookie-parser")
const app = express()
dotenv.config()

const port = 5000
const users = require("./routes/users.js")


app.use(cookieParser("somesecrets"))
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors({
  methods:["GET", "POST"],
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true // Allow cookies and other credentials
}))



app.get("/",(req,res)=>{
res.send("hola")
})

app.use("/users",users)

///App listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})
