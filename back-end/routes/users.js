const express = require("express")
const session = require("express-session")
const users = express.Router()
const db = require("../db/conn.js")

users.use(session({
    secret:"somesecrets",
    resave:false,
    saveUninitialized:false,
    cookies:{
        expires: 60*2
    }
}))

users.post('/get', async (req,res) => {
    let user = req.body.name
    if(user){
        try {
            let queryResult = await db.GetUser(user)
            res.json(queryResult)
            console.log("User sent!!")
          } catch (error) {
            console.error(error)
            res.sendStatus(500)
          }
    }
})

users.get('/login', (req,res) => {
    if(req.session.user){
        res.send({
            logged:true,
            user:req.session.user
        })
    }else{
        res.send({logged:false})
    }
})

users.post('/login', async (req, res) => {
    let username = req.body.username;
	let password = req.body.password;
    if (username && password) 
    {
        try
        {
         let queryResult=await db.AuthUser(username);
        
                if(queryResult.length>0)
                {
                    if(password===queryResult[0].geslo)
                    {
                        req.session.user = queryResult[0]
                        console.log("SESSION VALID")
                        return res.json({
                            success: true,
                            message: 'Login successful',
                            user: queryResult[0].username
                        })
                    }
                    else
                    {
                        console.log("INCORRECT PASSWORD")
                        return res.status(401).json({
                            success: false,
                            message: 'Incorrect password'
                        })
                    }
                }else 
                {
                    console.log("USER NOT REGISTRED")
                    return res.status(401).json({
                        success: false,
                        message: 'User not registered'
                    })
                }
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'An error occurred. Please try again later.'
            });
        }    
    }
    else
    {
        return res.status(400).json({
            success: false,
            message: 'Please enter Username and Password'
        })
    }
    res.end()
})

//Inserts a new user in our database id field are complete
users.post('/register', async (req, res) => {
    
    let username = req.body.username
    let name = req.body.name
    let surname = req.body.surname
	let password = req.body.password
    let isPrivate = req.body.isPrivate
    let gender = req.body.gender
    let age = req.body.age
    let email= req.body.email
    if (username && name && surname && password && (isPrivate === 0 || isPrivate === 1) && gender && age && email) 
    {
        try
        {
         let queryResult=await db.AddUser(username,name,surname,password,isPrivate,gender,age,email);
         if (queryResult.affectedRows) {
            console.log("New user added!!")
          }
               
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }
    else
    {
        console.log("A field is missing!")
    }

    res.end();

    
});

module.exports=users
