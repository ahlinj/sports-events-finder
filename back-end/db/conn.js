const mysql = require("mysql2")
const  conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_DATABASE,
  })

  let dataPool={}

  dataPool.AuthUser=(name)=>{
      return new Promise ((resolve, reject)=>{
        conn.query('SELECT * FROM Uporabnik WHERE ime = ?', name, (err,res, fields)=>{
          if(err){return reject(err)}
          return resolve(res)
        })
      })  
        
    }
    
    dataPool.AddUser=(name,surname,password,private,gender,age,email)=>{
      return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO Uporabnik (ime,priimek,geslo,(ne)privat,spol,starost,eposta) VALUES (?,?,?,?,?,?,?)`, [name,surname,password,private,gender,age,email ], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
        })
      })
    }
    


 conn.connect((err) => {
      if(err){
          console.log("ERROR: " + err.message);
          return;    
      }
      console.log('Connection established');
    })
  

module.exports = dataPool