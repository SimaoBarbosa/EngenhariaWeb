var models = require('../models/index')

// get competitions of phase
module.exports.getEventos = faseId => {
    return models.fase.findOne({
        attributes: [],
        where: {id_fase: faseId},
        include: ['eventos']
    })
}

//create new fase
module.exports.create = data => {
    return models.fase.create(values = data );
}