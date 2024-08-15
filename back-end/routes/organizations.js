const express = require("express")
const session = require("express-session")
const organizations = express.Router()
const db = require("../db/conn.js")

organizations.use(session({
    secret:"somesecrets",
    resave:false,
    saveUninitialized:false,
    cookies:{
        expires: 60*2
    }
}))

organizations.post('/get', async (req,res) => {
    let org = req.body.name
    if(org){
        try {
            let queryResult = await db.GetOrganization(org)
            res.json(queryResult)
            console.log("Organization sent!!")
          } catch (error) {
            console.error(error)
            res.sendStatus(500)
          }
    }
})

//Gets all the orgs in the DB 
organizations.get('/', async (req,res, next)=>{
    try{
        let queryResult=await db.allOrganizations();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
})

organizations.get('/login', (req,res) => {
    if(req.session.organization){
        res.send({
            logged:true,
            organization:req.session.organization
        })
    }else{
        res.send({logged:false})
    }
})

organizations.post('/login', async (req, res) => {
    let username = req.body.username;
	let password = req.body.password;
    if (username && password) 
    {
        try
        {
         let queryResult=await db.AuthOrganization(username);
        
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

//Inserts a new organization in our database id field are complete
organizations.post('/register', async (req, res) => {
    
    let username = req.body.username
    let name = req.body.name
	let password = req.body.password
    let address = req.body.address
    let email= req.body.email
    if (username && name && password && address && email) 
    {
        try
        {
         let queryResult=await db.AddOrganization(username,name,password,address,email);
         if (queryResult.affectedRows) {
            console.log("New organization added!!")
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

    
})

module.exports=organizations