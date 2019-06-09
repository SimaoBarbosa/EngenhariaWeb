var express = require('express');
var router = express.Router();
const ApostaConcretaController = require('../controllers/aposta_concretaController');

// get all bets
router.get('/:oid', async (req, res) => {
  ApostaConcretaController.getApostasConcretas({
    where: {
      user_oid: req.params.oid
    }
  }).then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// get win bets
router.get('/ganhas/:oid', async (req, res) => {
  ApostaConcretaController.getApostasConcretas({
    where: {
      user_oid: req.params.oid,
      resultado: 1
    }
  }).then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// get lost bets
router.get('/perdidas/:oid', async (req, res) => {
  ApostaConcretaController.getApostasConcretas({
    where: {
      user_oid: req.params.oid,
      resultado: 0
    }
  }).then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// get open bets
router.get('/abertas/:oid', async (req, res) => {
  ApostaConcretaController.getApostasConcretas({
    where: {
      user_oid: req.params.oid,
      resultado: -1
    }
  }).then(users => {
    res.send(users);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

module.exports = router;