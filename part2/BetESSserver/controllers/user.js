var models = require('../models/index')


// get all users
module.exports.find = seletores => {
    return models.user
           .findAll(seletores)
}