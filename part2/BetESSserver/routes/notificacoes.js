var express = require('express');
var router = express.Router();
const NotificationController = require('../controllers/notificacaoController');

// get notifications of a user
router.get('/user/:oid', async (req, res) => {
    let userId = req.params.oid
    NotificationController.notificationsUser(userId).then(notificacoes => {
      res.send(notificacoes);
    });
});

module.exports = router;