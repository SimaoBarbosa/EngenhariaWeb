var express = require('express');
var router = express.Router();
const EventoController = require('../controllers/eventoController');
const DataHoraController = require('../controllers/datahoraController');
const DesportoController = require('../controllers/desportoController');
const RegiaoController = require('../controllers/regiaoController');
const CompeticaoController = require('../controllers/competicaoController');
const FaseController = require('../controllers/faseController');

// get all the events
router.get('/', async (req, res) => {
    EventoController.findAll().then(eventos => {
      res.send(eventos);
    });
});

// get all the events with more info
router.get('/info', async (req, res) => {
    EventoController.findAllInfo().then(eventos => {
      res.send(eventos);
    });
});

// create new event
router.post('/insert', async (req, res) => {
    EventoController.create(req.body).then(evento => {
      console.log(req.body.titulo + ' ' + req.body.email)
      res.send(evento);
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

// get events of certain team
router.get('/team/:oid', async (req, res) => {
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
router.post('/test', async (req, res) => {
    
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

// get all the competitions of certain region and sport
router.get('/regioes/competicoes/:idR/:idD', async (req, res) => {
  RegiaoController.getCompeticoes(req.params.idR, req.params.idD).then(competicoes => {
    res.send(competicoes);
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


module.exports = router;