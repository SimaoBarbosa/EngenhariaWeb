var models = require('../models/index')

// get all apostas_disponivel
module.exports.getAll = () => {
    return models.aposta_disponivel.findAll({
        include:['opcoes','evento']
    })
}


// update odd of opcao
module.exports.updateOdd = (idopcao,odd) => {
    return models.opcao.update(
        { odd : odd },
        { where: { id_opcao: idopcao } }
      )
}

