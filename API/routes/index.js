var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/productlines/get', function(req, res) {
  const selectQuery = "SELECT * FROM productlines";
  connection.query(selectQuery, (error, results, fields)=>{
    if(error){
      res.json(error)
    } else {
      res.json(results)
    }
  });
});

router.post('/register', (req, res)=>{
  const username = req.body.username;
  const name = req.body.name;
  const password = bcrypt.hashSync(req.body.password);
  const email = req.body.email;
  const accountType = req.body.accountType;
  const city = req.body.city;
  const state = req.body.state;
  const salesRep = req.body.salesRep;
  const creditLimit = 16000000;


  const checkUsername = new Promise((resolve, reject) => {
    const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
    connection.query(checkUsernameQuery, [username],(error, results) =>{
      if (error) throw error;
      if (results.length > 0){
        reject({msg: "userAlreadyExists"});
      } else {
        resolve();
      }
    })
  })

  checkUsername.then(
    ()=>{
      var insertCustomerQuery = "INSERT INTO customers (customerName, city, state, salesRepEmployeeNumber) VALUES (?,?,?,?)";
      connection.query(insertCustomerQuery, [name, city, state, 1337, creditLimit],(error, results)=>{
        const newID = results.insertId;
        var currentTimeStamp = Date.now()/1000;
        var token = randToken.uid(40);
        var insertQuery = "INSERT INTO users (uid,type,password,created,token, username) VALUES (?,?,?,?,?,?)";
        connection.query(insertQuery,[newID, accountType, password, currentTimeStamp, token, username],(error2,results2)=>{
          if(error2){
            res.json({
              msg: error2
            })
          }else{
            res.json({
              msg: "userInserted",
              token: token
            })
          }
        });
      });
    }  
  ).catch(
    (error)=>{
      res.json(error)
    }
  )
});

router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var checkLoginQuery = "SELECT * FROM users WHERE email = ?"
  connection.query(checkLoginQuery, [email], (error, results)=>{
    if(error) throw error;
    if (results.length === 0) {
      res.json({
        msg: 'badUserName'
      })
    } else {
      // The username is valid. See if the password is valid as well. (This is the other side of bcrypt)
      var checkHash = bcrypt.compareSync(password, results[0].password)  // checkHash will be true or false. Always returns a boolean.
      if(checkHash){
        const updateToken = `Update users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR)`
        connection.query(updateToken,[token],(results2,error2)=>{
          res.json({
            msg: 'loginSuccess',
            name: results[0].name,
            token: token
          })
        })
        // Log user in, create a token, update it, send it back.
      } else {
        res.json({
          msg: 'wrongPassword'
        })
      }
    }
  })
})

module.exports = router;