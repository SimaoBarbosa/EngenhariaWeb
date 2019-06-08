var models = require('../models/index')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get competitions of a team
module.exports.getCompeticoes = equipaId => {
    return models.equipa.findOne({
        attributes: [],
        where: {id_equipa: equipaId},
        include: ['competicoes']
    })
}

// get team by name
module.exports.getEquipaByName = equipa => {
    return models.equipa.findAll({
        where: {
            nome:{
                [Op.regexp] : equipa
            }
        }
    })
}

