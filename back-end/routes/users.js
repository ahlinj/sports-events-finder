const express = require("express")
const users = express.Router()
const db = require("../db/conn.js")

users.post('/login', async (req, res) => {
    var name = req.body.name;
	var password = req.body.password;
    if (name && password) 
    {
        try
        {
         let queryResult=await db.AuthUser(name);
        
                if(queryResult.length>0)
                {
                    if(password===queryResult[0].geslo)
                    {
                    req.session.user=queryResult;
                    console.log(req.session.user)
                     console.log(queryResult)
                     console.log("SESSION VALID");
                    
                     //res.redirect('/');
                    }
                    else
                    {
                        console.log("INCORRECT PASSWORD");
                    }
                }else 
                {
                 console.log("USER NOT REGISTRED");   
                }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }
    else
    {
        console.log("Please enter Username and Password!")
    }
    res.end();
});

//Inserts a new user in our database id field are complete
users.post('/register', async (req, res) => {
    
    let name = req.body.name
    let surname = req.body.surname
	let password = req.body.password
    let private = req.body.private
    let gender = req.body.gender
    let age = req.body.age
    let email= req.body.email
    if (name && surname && password && private && gender && age && email) 
    {
        try
        {
         let queryResult=await db.AddUser(name,surname,password,private,gender,age,email);
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
