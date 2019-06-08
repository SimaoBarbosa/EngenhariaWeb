var express = require('express');
var router = express.Router();
const NotificacaoController = require('../controllers/notificacaoController');

// get notifications of a user
router.get('/user/:oid', async (req, res) => {
    let userId = req.params.oid
    NotificacaoController.notificacoesUser(userId).then(notificacoes => {
      res.send(notificacoes);
    });
});

module.exports = router;