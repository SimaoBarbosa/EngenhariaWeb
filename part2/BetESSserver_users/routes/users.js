var express = require('express');
var router = express.Router();
const UserController = require('./../controllers/userController');

// check login values
router.post('/login', async (req, res) => {
  UserController.checkLogin(req.body.user, req.body.password).then(l => {
    res.send(l);
  });
});

// get all users
router.get('/', async (req, res) => {
  UserController.find().then(users => {
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
  UserController.findNotificacoes(req.params.oid).then(notifications => {
    res.send(notifications);
  })
})

module.exports = router;
