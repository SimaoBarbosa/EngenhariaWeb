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

// add team to competition
module.exports.addTeam = (equipaId,compId) => {
    return models.equipa_competicao.create({
        equipa_id_equipa: equipaId,
        competicao_id_competicao: compId
    })
}
// remove team of competition
module.exports.removeTeam = (equipaId,compId) => {
    return models.equipa_competicao.destroy({
        where:{
            equipa_id_equipa: equipaId,
            competicao_id_competicao: compId
        }
    })
}

//create new competition
module.exports.create = data => {
    return models.competicao.create(values = data );
}