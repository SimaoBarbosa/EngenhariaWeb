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

// get all teams
module.exports.getEquipas = () => {
    return models.equipa.findAll()
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

// create new team
module.exports.create = team => {
    return models.equipa.create(values = team);
}


// delete team by id
module.exports.delete = id => {
    return models.equipa.destroy({
        where : {
            id_equipa: id
        },
        cascade: true
    });
}
