const mysql = require("mysql2")
const  conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_DATABASE,
  })

  let dataPool={}

    dataPool.AuthUser=(username)=>{
      return new Promise ((resolve, reject)=>{
        conn.query('SELECT * FROM Uporabnik WHERE username = ?', username, (err,res, fields)=>{
          if(err){return reject(err)}
          return resolve(res)
        })
      })  
        
    }
    
    dataPool.AddUser=(username,name,surname,password,private,gender,age,email)=>{
      return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO Uporabnik (username,ime,priimek,geslo,privat,spol,starost,eposta) VALUES (?,?,?,?,?,?,?,?)`, [username,name,surname,password,private,gender,age,email], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
        })
      })
    }

    dataPool.GetUserID=(username)=>{
        return new Promise ((resolve, reject)=>{
            conn.query('SELECT id FROM Uporabnik WHERE username = ?', username, (err,res, fields)=>{
            if(err){return reject(err)}
            return resolve(res[0].id)
            })
        })  
        }

    dataPool.GetUser=(username)=>{
      return new Promise ((resolve, reject)=>{
        conn.query('SELECT * FROM Uporabnik WHERE username = ?', username, (err,res, fields)=>{
        if(err){return reject(err)}
        return resolve(res[0])
        })
    })  
    }

    dataPool.AuthOrganization=(username)=>{
        return new Promise ((resolve, reject)=>{
          conn.query('SELECT * FROM Organizacija WHERE username = ?', username, (err,res, fields)=>{
            if(err){return reject(err)}
            return resolve(res)
          })
        })  
          
      }

    dataPool.GetOrganizationID=(username)=>{
    return new Promise ((resolve, reject)=>{
        conn.query('SELECT id FROM Organizacija WHERE username = ?', username, (err,res, fields)=>{
        if(err){return reject(err)}
        return resolve(res[0].id)
        })
    })  
    }

    dataPool.AddOrganization=(username,name,password,address,email)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO Organizacija (username,ime,geslo,naslov,eposta) VALUES (?,?,?,?,?)`, [username,name,password,address,email], (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
        })
    })
    }

    dataPool.allOrganizations=()=>{
        return new Promise ((resolve, reject)=>{
          conn.query(`SELECT * FROM Organizacija`, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
          })
        })
      }


    dataPool.allEvents=()=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`SELECT Dogodek.*, Organizacija.ime AS orgIme FROM Dogodek JOIN Organizacija ON Dogodek.o_ID = Organizacija.id`, (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
        })
    })
    }
    
    
    dataPool.AddEvent=(name,description,location,dateTime,organization)=>{
    return new Promise ((resolve, reject)=>{
        conn.query(`INSERT INTO Dogodek (ime,opis,lokacija,datumCas,o_ID) VALUES (?,?,?,?,?)`, [name,description,location,dateTime,organization], (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
        })
    })
    } 

    dataPool.JoinEvent=(u_ID,d_ID)=>{
        return new Promise ((resolve, reject)=>{
            conn.query(`INSERT INTO Uporabnik_Dogodek (u_ID,d_ID) VALUES (?,?)`, [u_ID,d_ID], (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
            })
        })
    }
    
    dataPool.UniqueUsersInEvent=(u_ID,d_ID)=>{
        return new Promise ((resolve, reject)=>{
            conn.query(`SELECT d_ID, COUNT(DISTINCT u_ID) AS uniqueUser FROM Uporabnik_Dogodek GROUP BY d_ID`, (err,res)=>{
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