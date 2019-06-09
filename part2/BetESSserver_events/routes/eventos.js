var express = require('express');
var router = express.Router();
const EventoController = require('../controllers/eventoController');
const DataHoraController = require('../controllers/datahoraController');
const CompeticaoController = require('../controllers/competicaoController');
const FaseController = require('../controllers/faseController');
const mw = require('../auth/auth_middlewares')

// get all the events
router.get('/', mw.verifyFuncionario ,async (req, res) => {
    EventoController.findAll().then(eventos => {
      res.send(eventos);
    });
});

// get all the events with more info
router.get('/info',  async (req, res) => {
    EventoController.findAllInfo().then(eventos => {
      res.send(eventos);
    });
});

// get teams of event
router.get('/equipas/:oid', async (req, res) => {
    EventoController.getTeams(req.params.oid).then(equipas => {
      res.send(equipas);
    });
});

// get apostas_disponiveis of event
router.get('/apostas_disponiveis/:oid', async (req, res) => {
    EventoController.getApostasDisponiveis(req.params.oid).then(apostas => {
      res.send(apostas);
    });
});

// get events of certain team => for vips
router.get('/equipa/:oid', async (req, res) => {
    EventoController.getEventosDeEquipa(req.params.oid).then(eventos =>{
        res.send(eventos);
    })
})

// Create new event
// -------
// Body of the POST message needs to have the following values:
// -> titulo
// -> fase
// -> data
// -> hora
// -> equipas
router.post('/insert', async (req, res) => {
    
    let titulo = req.body.titulo;
    let id_fase = req.body.fase;
    let equipas = JSON.parse(req.body.equipas);

    let data = req.body.data;
    let hora = req.body.hora;
    
    DataHoraController.exists(data, hora).then(existe => {
      if (existe){ 

          DataHoraController.getId(data, hora).then(datahora => {

            let id_datahora = datahora.id_datahora;

            EventoController.create({
                titulo: titulo,
                fase_id_fase: id_fase,
                datahora_datahora_id: id_datahora
            }).then(response => {
                equipas.forEach(equipa => {
                    EventoController.addTeam(response.id_evento, equipa);
                })
                res.send(response);
            })

          })

      } else {
          
          DataHoraController.create({data: data, hora: hora}).then(datahora => {
            let id_datahora = datahora.id_datahora;

            EventoController.create({
                titulo: titulo,
                fase_id_fase: id_fase,
                datahora_datahora_id: id_datahora
            }).then(response => {
                equipas.forEach(equipa => {
                    EventoController.addTeam(response.id_evento, equipa);
                })
                res.send(response);
            })

          })
      }
    });
});


// get phases of competition
router.get('/competicoes/fases/:oid', async (req, res) => {
  CompeticaoController.getFases(req.params.oid).then(fases => {
    res.send(fases);
  });
});

// get events of phase
router.get('/fase/:oid', async (req, res) => {
  FaseController.getEventos(req.params.oid).then(eventos => {
    res.send(eventos);
  });
});

// remove team of event
router.post('/removeEquipa/:idevento/:idteam', async (req, res) => {
  let idevento = req.params.idevento;
  let idteam = req.params.idteam;
  EventoController.removeTeam(idevento,idteam)
  .then((n_deleted) => {
    if (n_deleted>0) 
      res.send("Removida relação equipa/evento com sucesso")
    else 
      res.send("Relação equipa/evento não removida, pois não existe")
  })
  .catch(err => res.status(500).send(err + "\n\n Relação equipa/evento ERRO"))

});


// add team to event
router.post('/addEquipa/:idevento/:idteam', async (req, res) => {
  let idevento = req.params.idevento;
  let idteam = req.params.idteam;
  EventoController.addTeam(idevento,idteam)
  .then((evento_equipa) => {
    res.send(evento_equipa);
  })
  .catch(err => res.status(500).send(err + "\n\n Relação equipa/evento ERRO"))

});

module.exports = router;