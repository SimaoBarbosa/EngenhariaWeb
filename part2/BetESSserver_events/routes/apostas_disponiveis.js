var express = require('express');
var router = express.Router();
var axios = require('axios')
const ApostasController = require('../controllers/aposta_disponivelController');
const OpcaoController = require('../controllers/opcaoController');

// get  apostas disponiveis
// ------
// PARAMS
// vip       -> int => 0= false, 1=true , else both
// available -> int => 0= false, 1=true , else both
router.get('apostas/:vip/:available', async (req, res) => {
    let vip = req.params.vip
    let available =  req.params.available
    let seletores = {}
    if(vip==0) 
      seletores["vip"] = false
    else if(vip==1)     
      seletores["vip"] = true

    if(available==0) 
      seletores["disponibilidade"] = false
    else if(available==1)
      seletores["disponibilidade"] = true
    ApostasController.getAll(seletores)
    .then(apostas => {
      res.send(apostas);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
});

// get  apostas disponiveis of event
// ------
// PARAMS
// vip       -> int => 0= false, 1=true , else both
// available -> int => 0= false, 1=true , else both
// idevento  -> id of evento
router.get('/ofEvento/:vip/:available/:idevento', async (req, res) => {
  let vip = req.params.vip
  let available =  req.params.available
  let id_evento = req.params.idevento
  let seletores = {
    evento_id_evento :  id_evento
  }
  if(vip==0) 
    seletores["vip"] = false
  else if(vip==1)     
  seletores["vip"] = true

  if(available==0) 
    seletores["disponibilidade"] = false
  else if(available==1)
    seletores["disponibilidade"] = true
  ApostasController.getAll(seletores)
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

// Create and add opcao to aposta disponivel
// -------
// Body of the POST message needs to have the following values:
// -> opcao          -- name of option
// -> odd            -- float with odd 
// -> aposta         -- id aposta disponivel
router.post('/createAddOpcao', async (req, res) => {
  let opcao = req.body.opcao;
  let odd = req.body.odd;
  let aposta = req.body.aposta;
  OpcaoController.create({
      opcao:opcao,
      odd:odd,
      aposta_disponivel_id_aposta_di : aposta
  })
  .then(response => {
    res.send(response);
  })
  .catch(err=>{
      res.status(500).send(err);
  })
});

// End Bet
// -------
// Body of the POST message needs to have the following values:
// -> id_aposta      -- id of aposta_disponivel
// -> id_opcao       -- id of option
router.post('/end', async (req, res) => {
  let id_aposta = req.body.id_aposta;
  let id_opcao = req.body.id_opcao;
  ApostasController.endBet(id_opcao,id_aposta)
  .then(response => {
      console.dir(response);
      axios({
        method: 'post',
        url: 'http://localhost:3000/api_users/apostas/end_available_bet',
        headers: {}, 
        data: {
          id_aposta_disponivel: id_aposta,
          id_opcao : id_opcao
        }
      })
      .then(response => {
        res.send(response)
      })
      .catch(() => {
        console.log(response)
        ApostasController.usersNotUpdated(id_opcao,id_aposta)
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          res.send(err)
        })
      })
  })
  .catch(err=>{
      res.status(500).send(err);
  })
});

// Create Bet
// -------
// Body of the POST message needs to have the following values:
// -> titulo          -- name of aposta_disponivel
// -> vip             -- 0=false, else true
// -> id_evento       -- if of event
router.post('/create', async (req, res) => {
  let titulo = req.body.titulo
  let id_evento = req.body.id_evento
  let vip = (req.body.vip != 0)
  ApostasController.create({
    disponibilidade : false, // necessário tornar disponivel após adicionar opções
    titulo : titulo,
    resultado_final : -1,
    vip :vip,
    evento_id_evento: id_evento
  })
  .then(response => {
    res.send(response);
  })
  .catch(err=>{
      res.status(500).send(err);
  })
});

// Make bet available
// -------
// idaposta => id of aposta disponivel
router.post('/makeAvailable/:idaposta', async (req, res) => {
  ApostasController.makeAvailable(req.params.idaposta)
  .then(resp=>res.send(resp))
  .catch(err=>res.status(500).send(err))
});

router.get('/disponivel/:oid', async (req, res) => {
  ApostasController.isAvailable(req.params.oid)
  .then(resp=>res.send(resp))
  .catch(err=>res.status(500).send(err))
})

module.exports = router;

