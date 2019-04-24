var express = require('express');
var router = express.Router();
var app = require('../app.js')


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
  let insert_data = '(\''+ req.body.oid
                  + '\',\'' + req.body.username
                  + '\',\'' + req.body.password
                  + '\',\''+ req.body.email 
                  + '\',\''+ req.body.saldo 
                  + '\',\''+ req.body.group_oid
                   +'\')' ;
  console.log(insert_data);
  
  let sql = "INSERT INTO user VALUES  "+ insert_data ;
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
