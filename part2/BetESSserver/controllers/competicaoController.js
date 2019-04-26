var models = require('../models/index')

module.exports.getEquipas = competicaoId => {
    return models.competicao.findOne({
        attributes: [],
        where: {id_competicao: competicaoId},
        include: ['equipas']
    })
}