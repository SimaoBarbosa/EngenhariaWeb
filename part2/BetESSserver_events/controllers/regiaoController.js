var models = require('../models/index')

// get all the competitions of certain sport and region 
module.exports.getCompeticoes = (regiaoId, desportoId) => {
    return models.regiao.findOne({
        where: {id_regiao: regiaoId},
        attributes: [],
        include: [
            {
                association: 'competicoes',
                include: [
                    {
                        association: 'desporto',
                        where: {id_desporto : desportoId},
                        attributes: []
                    }
                ]
            }
        ]
    })
}