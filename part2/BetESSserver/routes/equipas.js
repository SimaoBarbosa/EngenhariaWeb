var express = require('express');
var router = express.Router();
const EquipaController = require('../controllers/equipaController');

// get competitions of a team
router.get('/competicoes/:oid', async (req, res) => {
    let equipaId = req.params.oid
    EquipaController.getCompeticoes(equipaId).then(competicoes => {
      res.send(competicoes);
    });
});

module.exports = router;