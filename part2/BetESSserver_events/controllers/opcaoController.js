var models = require('../models/index')

//create new option
module.exports.create = data => {
    return models.opcao.create(values = data );
}