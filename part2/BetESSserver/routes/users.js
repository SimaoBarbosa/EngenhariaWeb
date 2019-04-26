var express = require('express');
var router = express.Router();
const UserController = require('./../controllers/userController');

// get all users
router.get('/', async (req, res) => {
  UserController.find().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
    res.send(users);
  });
});

// create new user
router.post('/insert', async (req, res) => {
  UserController.create(req.body).then(user => {
    res.send(user);
  });
})

// get notifications of user
router.get('/notificacoes/:oid', async (req, res) => {
  UserController.findNotifications(req.params.oid).then(notifications => {
    res.send(notifications);
  })
})

module.exports = router;
