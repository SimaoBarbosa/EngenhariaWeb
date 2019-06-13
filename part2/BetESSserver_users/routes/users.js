var express = require('express');
var router = express.Router();
const UserController = require('./../controllers/userController');
const mw = require('../auth/auth_middlewares');
// check login values
router.post('/login', async (req, res) => {
  UserController.checkLogin(req.body.user, req.body.password).then(l => {
    res.send(l);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// get all users
router.get('/', mw.verifyFuncionario, async (req, res) => {

  UserController.find().then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// get all apostadores
router.get('/apostadores', mw.verifyFuncionario, async (req, res) => {

  UserController.findApostadores().then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});


// get specific user
router.get('/:oid', mw.verifyProprioApostador, async (req, res) => {
  UserController.findUser({
    where: {
      oid: req.params.oid
    }
  }).then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// create new user
// -------
// Body of the POST message needs to have the following values:
// -> username  -- string with username of user
// -> password  -- string with password of user
// -> email     -- string with email of user
// -> saldo     -- value of the money to put on user account
router.post('/create', async (req, res) => {
  req.body.group = 1
  UserController.create(req.body).then(user => {
    res.send(user);
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

// remove specific user
router.post('/delete/:oid', mw.verifyFuncionario, async (req, res) => {
  UserController.remove(req.params.oid).then(() => {
    res.send({success: true});
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

// add amount of money
// -------
// Body of the POST message needs to have the following values:
// -> user      -- id of user
// -> valor     -- ammount of money to add to the account
router.post('/saldo', mw.verifyApostador, async (req, res) => {
  UserController.adicionarQuantia(req.body.user, req.body.valor).then(() => {
    res.send({success: true});
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

// make user VIP and pay 50 ESScoins
router.post('/vip_p/:oid', mw.verifyApostador, async (req, res) => {
  UserController.tornarVIP_pagamento(req.params.oid).then(r => {
    res.send(r);
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

// make user VIP
router.post('/vip/:oid', mw.verifyFuncionario, async (req, res) => {
  UserController.tornarVIP(req.params.oid).then(r => {
    res.send(r);
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

// make user normal
router.post('/normal/:oid', mw.verifyApostador, async (req, res) => {
  UserController.tornarNormal(req.params.oid).then(r => {
    res.send(r);
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

module.exports = router;
