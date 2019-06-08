var models = require('../models/index')

// get competitions of a team
module.exports.getCompeticoes = equipaId => {
    return models.equipa.findOne({
        attributes: [],
        where: {id_equipa: equipaId},
        include: ['competicoes']
    })
}