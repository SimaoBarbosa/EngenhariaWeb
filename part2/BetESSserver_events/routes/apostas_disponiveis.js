var express = require('express');
var router = express.Router();
const ApostasController = require('../controllers/aposta_disponivelController');

// get all apostas disponiveis
router.get('/', async (req, res) => {
    ApostasController.getAll()
    .then(apostas => {
      res.send(apostas);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
});

// Update Odd of opcao
// -------
// Body of the POST message needs to have the following values:
// -> id_opcao       -- id of option
// -> odd            -- float with odd 
router.post('/updateOdd', async (req, res) => {
  let id_opcao = req.body.id_opcao;
  let odd = req.body.odd;
  ApostasController.updateOdd(id_opcao,odd)
  .then(response => {
    res.send("Number of affected rows:"+response);
  })
  .catch(err=>{
      res.status(500).send(err);
  })
});
module.exports = router;

