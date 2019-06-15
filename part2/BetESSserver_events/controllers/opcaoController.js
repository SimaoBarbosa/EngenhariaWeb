var models = require('../models/index')

//create new option
module.exports.create = data => {
    return models.opcao.create(values = data );
}

//get opcao
module.exports.getOpcao = idopcao => {
    return models.opcao.findOne({
        where:{id_opcao:idopcao}
    } );
}