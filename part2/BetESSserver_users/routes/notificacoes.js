var express = require('express');
var router = express.Router();
const NotificacaoController = require('../controllers/notificacaoController');
const mw = require('../auth/auth_middlewares');

// get notifications of a user
router.get('/user/:oid', async (req, res) => {
    let userId = req.params.oid
    NotificacaoController.notificacoesUser(userId).then(notificacoes => {
      res.send(notificacoes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// remove specific notification
router.post('/delete/:oid', mw.verifyApostador, async (req, res) => {
  NotificacaoController.remove(req.params.oid).then(() => {
    res.send({success: true});
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

module.exports = router;
