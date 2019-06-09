var models = require('../models/index')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get all the events with date and time
module.exports.findAll = () => {
    return models.evento.findAll({
        include: ['datahora']
    });
}

// get all the event with date and time, competition and phase 
module.exports.findAllInfo = () => {
    return models.evento.findAll({
        include: [
            'datahora',
            {
                association: 'fase', 
                include: ['competicao']
            },
        ]
    });
}

// create new event
module.exports.create = evento => {
    return models.evento.create(values = evento);
}


// get the teams of certain event
module.exports.getTeams = (eventoId) => {
    return models.evento.findOne({
        where: {id_evento: eventoId},
        attributes: [],
        include: ['equipas']
    });
}

// get aposta_disponiveis of certain event
module.exports.getApostasDisponiveis = (eventoId) => {
    return models.evento.findOne({
        where: {id_evento: eventoId},
        attributes: [],
        include: ['apostas_disponiveis']
    });
}

// get events of team => for vips (history of teams)
module.exports.getEventosDeEquipa = (equipaId) => {
    return models.evento.findAll({
        include: [{
            association: 'equipas',
            where: {id_equipa: equipaId},
            attributes: []
        }, 'datahora',
        {
            association : 'apostas_disponiveis',
            where : {
                disponibilidade:true,
                resultado_final:{
                    [Op.gt]:-1
                }
            }
        },
        {
            association: 'fase', 
            include: ['competicao']
        }]
    });
}

// add team to event
module.exports.addTeam = (eventoId, equipaId) => {
    return models.evento_equipa.create({
        evento_id_evento: eventoId,
        equipa_id_equipa: equipaId
    })
}

// remove team of event
module.exports.removeTeam = (eventoId, equipaId) => {
    return models.evento_equipa.destroy({
        where:{
            evento_id_evento: eventoId,
            equipa_id_equipa: equipaId
        }
    })
}