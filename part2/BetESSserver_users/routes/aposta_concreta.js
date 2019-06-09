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

// create new concrete bet
// -------
// Body of the POST message needs to have the following values:
// -> quantia                 -- amount of money to bet
// -> odd_fixada              -- odd of the option
// -> id_aposta_disponivel    -- id of available bet
// -> id_opcao                -- id of option
// -> nome_opcao              -- option name
// -> nome_aposta_disponivel  -- available bet name
// -> nome_evento             -- event name
// -> nome_competicao         -- competition name
// -> user_oid                -- user id
router.post('/create', async (req, res) => {
  req.body.resultado = -1
  ApostaConcretaController.create(req.body).then(r => {
    res.send(r);
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

// end specific available bet
// -------
// Body of the POST message needs to have the following values:
// -> id_aposta_disponivel    -- id of available bet
// -> id_opcao                -- id of final option
router.post('/end_available_bet', async (req, res) => {
  ApostaConcretaController.fecharApostaDisponivel(req.body.id_aposta_disponivel, req.body.id_opcao).then(r => {
    res.send(r);
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

module.exports = router;