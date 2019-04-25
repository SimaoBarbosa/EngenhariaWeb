var express = require('express');
var router = express.Router();
var app = require('../app.js');
const UserController = require('./../controllers/user');


/* Operations using controllers/models */

// get all users
router.get('/teste', async (req, res) => {
  UserController.find().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
    res.send(JSON.stringify({users}));
  });
});

// insert new user
router.post('/insert', async (req, res) => {
  UserController.create(req.body).then(user => {
    res.send(JSON.stringify({user}))
  });
})



/* Operations with sql querys directly */
 
//show all users
router.get('/', async (req, res) => {
  let sql = "SELECT * FROM user";
  let query = app.db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get user by id
router.get('/:oid', async (req, res) => {
  var oid = req.params.oid
  let sql = "SELECT * FROM user WHERE oid="+oid;
  let query = app.db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//insert user 
router.post('/', async (req, res) => {
  console.dir(req.body);
  let insert_data = '(\''+ req.body.username
                  + '\',\'' + req.body.password
                  + '\',\''+ req.body.email 
                  + '\',\''+ req.body.saldo 
                  + '\',\''+ req.body.group_oid
                   +'\')' ;
  console.log(insert_data);
  
  let sql = "INSERT INTO user (username, password, email, saldo, group_oid) VALUES  "+ insert_data ;
  let query = app.db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//delete user by id
router.delete('/:oid', async (req, res) => {
  var oid = req.params.oid
  let sql = "DELETE FROM user WHERE oid="+oid;
  let query = app.db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


module.exports = router;
