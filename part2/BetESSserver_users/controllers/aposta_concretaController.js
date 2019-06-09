var models = require('../models/index')

// get concrete bets of user
module.exports.getApostasConcretas = seletores => {
    return models.aposta_concreta.findAll(seletores);
}