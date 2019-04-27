var models = require('../models/index')

// get all users
module.exports.find = seletores => {
    return models.user.findAll(seletores);
}

// create new user
module.exports.create = user => {
    return models.user.create(values = user);
}

// get notifications of user
module.exports.findNotificacoes = userId => {
    return models.user.findOne({
        attributes: [],
        where: {oid: userId},
        include: ['notificacoes']
    })
}