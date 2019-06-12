var express = require('express');
var router = express.Router();
const CompeticaoController = require('../controllers/competicaoController');
const DesportoController = require('../controllers/desportoController');
const RegiaoController = require('../controllers/regiaoController');
const FaseController = require('../controllers/faseController');
const mw = require('../auth/auth_middlewares');

// --------------------------------------COMPETITION--------------------------------------------

router.get('/', mw.verifyApostador, async (req, res) => {
	CompeticaoController.getCompeticoes().then(competicoes => {
      res.send(competicoes);
    }).catch(err => {
    	res.status(500).send(err)
    });
});

// get teams of a competition
router.get('/equipas/:oid', async (req, res) => {
    let competicaoId = req.params.oid
    CompeticaoController.getEquipas(competicaoId).then(equipas => {
      res.send(equipas);
    });
});

// remove team of competicion
router.post('/removeEquipa/:idcomp/:idteam', mw.verifyFuncionario, async (req, res) => {
  let idcomp = req.params.idcomp;
  let idteam = req.params.idteam;
  CompeticaoController.removeTeam(idteam,idcomp)
  .then((n_deleted) => {
    if (n_deleted > 0) 
      res.send("Removida relação equipa/competição com sucesso")
    else 
      res.send("Relação equipa/competicao não removida, pois não existe")
  })
  .catch(err =>res.status(500).send(err + "\n\n Relação equipa/competição ERRO"))   

});

// add team to competicion
router.post('/addEquipa/:idcomp/:idteam', mw.verifyFuncionario , async (req, res) => {
  let idcomp = req.params.idcomp;
  let idteam = req.params.idteam;
  CompeticaoController.addTeam(idteam,idcomp)
  .then((comp_equipa) => {
    res.send(comp_equipa);
  })
  .catch(err => res.status(500).send(err + "\n\n Relação equipa/competicao ERRO"))

});

// get phases of competition
router.get('/fases/:oid', async (req, res) => {
  CompeticaoController.getFases(req.params.oid).then(fases => {
    res.send(fases);
  });
});

// get all the competitions of certain region and sport
router.get('/regioes/:idR/:idD', async (req, res) => {
  RegiaoController.getCompeticoes(req.params.idR, req.params.idD).then(competicoes => {
    res.send(competicoes);
  });
});

// create competition
// -------
// Body of the POST message needs to have the following values:
// -> nome      -- string with name of competition
// -> desporto  -- id desporto
// -> regiao    -- id regiao
router.post('/create', mw.verifyFuncionario , async (req, res) => {
  let nome= req.body.nome
  let desporto= req.body.desporto
  let regiao= req.body.regiao
  CompeticaoController.create({
    nome:nome,
    desporto_id_desporto : desporto,
    regiao_id_regiao : regiao
  })
  .then(resp=>res.send(resp))
  .catch(err=>res.status(500).send(err))
});


// --------------------------------------SPORTS--------------------------------------------

// create sport
// -------
// Body of the POST message needs to have the following values:
// -> nome   -- string with name of sport
router.post('/createDesporto', mw.verifyFuncionario , async (req, res) => {
  console.log("Nome desporto:"+req.body.nome);
  
  if(!req.body.nome) res.status(500).send("Null input")
  DesportoController.create({nome:req.body.nome})
  .then(resp=>res.send(resp))
  .catch(err=>res.status(500).send(err))
});

// add region to sport
router.post('/addRegiaoToDesporto/:idreg/:idsport', mw.verifyFuncionario ,async (req, res) => {
  let idreg = req.params.idreg;
  let idsport = req.params.idsport;
  DesportoController.addRegion(idsport,idreg)
  .then((resp) => {
    res.send(resp);
  })
  .catch(err => res.status(500).send(err + "\n\n Relação desporto/regiao ERRO"))
});

// remove region to sport
router.post('/removeRegiaoOfDesporto/:idreg/:idsport', mw.verifyFuncionario ,async (req, res) => {
  let idreg = req.params.idreg;
  let idsport = req.params.idsport;
  CompeticaoController.removeTeam(idsport,idreg)
  .then((n_deleted) => {
    if (n_deleted>0) 
      res.send("Removida relação desporto/região com sucesso")
    else 
      res.send("Relação desporto/região não removida, pois não existe")
  })
  .catch(err => res.status(500).send(err + "\n\n Relação desporto/região ERRO"))

});

// get all the sports
router.get('/desportos', async (req, res) => {
  DesportoController.getAll().then(desportos => {
    res.send(desportos);
  });
});

// get all the regions of certain sport
router.get('/desporto/regioes/:oid', async (req, res) => {
  DesportoController.getRegioes(req.params.oid).then(regioes => {
    res.send(regioes);
  });
});

// --------------------------------------REGIONS--------------------------------------------

// create region -- if region name exists, relates sports withs existant region
// -------
// Body of the POST message needs to have the following values:
// -> nome   -- string with name of region
// -> desporto -- sport for that region
router.post('/addOrCreateRegiao', mw.verifyFuncionario , async (req, res) => {

  console.log("Desportoo:"+req.body.desporto);
  let nome = req.body.nome;
  let desporto = req.body.desporto;
  console.log("Desportoo:"+desporto);
  
  RegiaoController.getByName(nome)
  .then(regiao=>{
    if (regiao==null){
      RegiaoController.create(nome)
      .then(resp=>{
        
          DesportoController.addRegion(desporto, resp.id_regiao)
          .then(r => res.send("Sucesso"))

        
      })
      .catch(err=>res.status(500).send(err))
    }
    else{
        DesportoController.addRegion(desporto, regiao.id_regiao)
        .then(r => res.send("Sucesso"))
      
    }
  })
  .catch(err=>res.status(500).send(err))
});


// --------------------------------------PHASES--------------------------------------------

// create fase -- creates fase and add to competicion
// -------
// Body of the POST message needs to have the following values:
// -> nome       -- string with name of fase
// -> competicao -- id of competition
router.post('/createFase', mw.verifyFuncionario, async (req, res) => {
  let nome  = req.body.nome;
  let competicao = req.body.competicao;

  FaseController.create({
    nome:nome,
    competicao_id_competicao : competicao
  })
  .then(resp=> res.send(resp))
  .catch(err=>res.status(500).send(err))

});
module.exports = router;