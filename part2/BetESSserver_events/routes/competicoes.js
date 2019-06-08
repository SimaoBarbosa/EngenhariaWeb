var express = require('express');
var router = express.Router();
const CompeticaoController = require('../controllers/competicaoController');

// get teams of a competition
router.get('/equipas/:oid', async (req, res) => {
    let competicaoId = req.params.oid
    CompeticaoController.getEquipas(competicaoId).then(equipas => {
      res.send(equipas);
    });
});

module.exports = router;