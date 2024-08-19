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

    dataPool.GetOrganization=(username)=>{
      return new Promise ((resolve, reject)=>{
        conn.query('SELECT * FROM Organizacija WHERE username = ?', username, (err,res, fields)=>{
        if(err){return reject(err)}
        return resolve(res[0])
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
        conn.query(`SELECT Dogodek.*, Organizacija.ime AS orgIme FROM Dogodek JOIN Organizacija ON Dogodek.o_ID = Organizacija.id WHERE Dogodek.datumCas >= NOW()`, (err,res)=>{
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

    dataPool.GetEventID=(name)=>{
      return new Promise ((resolve, reject)=>{
          conn.query('SELECT id FROM Dogodek WHERE ime = ?', name, (err,res, fields)=>{
          if(err){return reject(err)}
          return resolve(res[0].id)
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

    dataPool.CheckJoinedEvents=(u_ID)=>{
      return new Promise ((resolve, reject)=>{
        conn.query(`SELECT DISTINCT Uporabnik_Dogodek.d_ID FROM Uporabnik_Dogodek JOIN Dogodek ON Uporabnik_Dogodek.d_ID = Dogodek.id WHERE Uporabnik_Dogodek.u_ID = ? AND Dogodek.datumCas >= NOW()`, u_ID, (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
        })
    })
    }

    dataPool.AddToken=(u_ID,d_ID)=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`INSERT INTO Zeton (vrednost,datumPrejetja,d_ID,u_ID) VALUES (?,?,?,?)`, [Math.floor(Math.random() * 100) + 1,convertDateTime(Date.now()),d_ID,u_ID], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
  }

    dataPool.GetTokenTotal=(u_ID)=>{
      return new Promise ((resolve, reject)=>{
        conn.query(`SELECT SUM(vrednost) AS total_vrednost FROM Zeton WHERE u_ID = ? AND MONTH(datumPrejetja) = MONTH(CURRENT_DATE()) AND YEAR(datumPrejetja) = YEAR(CURRENT_DATE())`, u_ID, (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
        })
    })
    }

    dataPool.GetTokenWinner=()=>{
      return new Promise ((resolve, reject)=>{
        conn.query(`SELECT Uporabnik.username, SUM(Zeton.vrednost) AS total_vrednost FROM Zeton JOIN Uporabnik ON Zeton.u_ID = Uporabnik.id WHERE MONTH(Zeton.datumprejetja) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) AND YEAR(Zeton.datumprejetja) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)) GROUP BY Zeton.u_ID ORDER BY total_vrednost DESC LIMIT 1`, (err,res)=>{
        if(err){return reject(err)}
        return resolve(res)
        })
    })
    }
    

    dataPool.allTokensByUser=(u_ID)=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`SELECT Zeton.*, Dogodek.ime AS dogodekIme FROM Zeton JOIN Dogodek ON Zeton.d_ID = Dogodek.id WHERE Zeton.u_ID = ? AND MONTH(Zeton.datumPrejetja) = MONTH(CURRENT_DATE()) AND YEAR(Zeton.datumPrejetja) = YEAR(CURRENT_DATE())`, u_ID ,(err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
      }

      dataPool.allTokensAllUsers=()=>{
        return new Promise ((resolve, reject)=>{
            conn.query(`SELECT Zeton.u_ID, Uporabnik.username, SUM(Zeton.vrednost) AS total_vrednost FROM Zeton JOIN Uporabnik ON Zeton.u_ID = Uporabnik.id WHERE MONTH(Zeton.datumprejetja) = MONTH(CURRENT_DATE()) AND YEAR(Zeton.datumprejetja) = YEAR(CURRENT_DATE()) GROUP BY Zeton.u_ID ORDER BY total_vrednost DESC` ,(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
            })
        })
        }

      dataPool.allPrizesAllUsers=()=>{
        return new Promise ((resolve, reject)=>{
            conn.query(`SELECT * FROM Nagrada WHERE YEAR(datumObjave) = YEAR(CURDATE()) AND MONTH(datumObjave) = MONTH(CURDATE()) AND datumPrejetja IS NULL` ,(err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
            })
        })
        }


      dataPool.AddPrize=(value,sponsor)=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`INSERT INTO Nagrada (vsota,datumObjave,sponzor) VALUES (?,?,?)`, [value,convertDateTime(Date.now()),sponsor], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
    }

      dataPool.AddPrizeWinner=(winner)=>{
        return new Promise ((resolve, reject)=>{
            conn.query(`UPDATE Nagrada SET datumPrejetja = NOW(), u_ID = ? WHERE datumPrejetja IS NULL`,winner, (err,res)=>{
            if(err){return reject(err)}
            return resolve(res)
            })
        })

    }

    dataPool.AddRating=(d_ID,u_ID,rating)=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`INSERT INTO Ocena (vrednost, d_ID, u_ID) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE vrednost = VALUES(vrednost)`, [rating,d_ID,u_ID], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
    }

    dataPool.GetAverageRatings=()=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`SELECT d_ID, AVG(vrednost) AS average_vrednost FROM Ocena GROUP BY d_ID`, (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
    }

    dataPool.AddComment=(d_ID,u_ID,comment)=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`INSERT INTO Komentar (datum, sporocilo, d_ID, u_ID) VALUES (NOW() ,?, ?, ?) ON DUPLICATE KEY UPDATE datum = VALUES(datum), sporocilo = VALUES(sporocilo)`, [comment,d_ID,u_ID], (err,res)=>{
          if(err){return reject(err)}
          return resolve(res)
          })
      })
    }
    
    dataPool.GetCommentsByEvent=(d_ID)=>{
      return new Promise ((resolve, reject)=>{
          conn.query(`SELECT Komentar.*, Uporabnik.ime FROM Komentar JOIN Uporabnik ON Komentar.u_ID = Uporabnik.id WHERE Komentar.d_ID = ?`, d_ID, (err,res)=>{
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


  function convertDateTime(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  

module.exports = dataPool