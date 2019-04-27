var models = require('../models/index')

// get all sports
module.exports.getAll = seletores => {
    return models.desporto.findAll(seletores);
}

// get all the regions of certain sport
module.exports.getRegioes = (desportoId) => {
    return models.desporto.findOne({
        where: {id_desporto: desportoId},
        attributes: [],
        include: ['regioes']
    })
}