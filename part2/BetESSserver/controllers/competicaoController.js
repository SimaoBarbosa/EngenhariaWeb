var models = require('../models/index')

// get events of compettion
module.exports.getFases = competicaoId => {
    return models.competicao.findOne({
        attributes: [],
        where: {id_competicao: competicaoId},
        include: ['fases']
    })
}

// get teams of competition
module.exports.getEquipas = competicaoId => {
    return models.competicao.findOne({
        attributes: [],
        where: {id_competicao: competicaoId},
        include: ['equipas']
    })
}