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

//create new sport
module.exports.create = sport => {
    return models.desporto.create(values = sport);
}

// add region to sport
module.exports.addRegion = (sportId,regionId) => {
    return models.desporto_regiao.create({
        desporto_id_desporto: sportId,
        regiao_id_regiao: regionId
    })
}

// remove team of competition
module.exports.removeRegion = (sportId,regionId) => {
    return models.desporto_regiao.destroy({
        where:{
            desporto_id_desporto: sportId,
            regiao_id_regiao: regionId
        }
    })
}