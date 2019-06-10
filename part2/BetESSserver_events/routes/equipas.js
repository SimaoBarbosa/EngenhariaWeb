var express = require('express');
var router = express.Router();
const EquipaController = require('../controllers/equipaController');
const CompeticaoController = require('../controllers/competicaoController');
const mw = require('../auth/auth_middlewares');

// get competitions of a team
router.get('/competicoes/:oid', async (req, res) => {
    let equipaId = req.params.oid
    EquipaController.getCompeticoes(equipaId).then(competicoes => {
      res.send(competicoes);
    });
});

// get all teams
router.get('/', async (req, res) => {
  EquipaController.getEquipas().then(equipas => {
    res.send(equipas);
  })
  .catch(err=>{
    res.status(500).send(err);
  });
});

// get team by name
router.get('/:nome', async (req, res) => {
  let nomeEquipa = req.params.nome
  EquipaController.getEquipaByName(nomeEquipa).then(equipas => {
    res.send(equipas);
  })
  .catch(err=>{
    res.status(500).send(err);
  });
});

// delete team by id
router.post('/delete/:id', mw.verifyFuncionario ,async (req, res) => {
  let id_equipa = req.params.id
  EquipaController.delete(id_equipa).then(n_deleted => {
    if(n_deleted>0)
      res.send("Equipa " + id_equipa + " apagada com sucesso !!");
    else
      res.send("Nenhuma equipa apagada!");
  })
  .catch(err=>{
    res.status(500).send(err);
  });
});

// create new team 
// -------
// Body of the POST message needs to have the following values:
// -> equipa       -- string name of team
// -> competicoes  -- list of ids of competicions
router.post('/insert', mw.verifyFuncionario ,async (req, res) => {
      
  let equipa = req.body.equipa;
  let competicoes = JSON.parse(req.body.competicoes);
  
  EquipaController.create({
    nome: equipa
  })
  .then(new_equipa => {
    competicoes.forEach(competicao => {
      CompeticaoController.addTeam(new_equipa.id_equipa, competicao)
      .then(() => console.log("Adicionada relação equipa/competição com sucesso"))
      .catch(err => res.status(500).send(err + "\n\n Relação equipa/competição ERRO"))
    })
    res.send(new_equipa);

  })
  .catch(err=>{
    res.status(500).send(err);
  })
});

module.exports = router;