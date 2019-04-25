var models = require('../models/index')

// get all users
module.exports.find = seletores => {
    return models.user.findAll(seletores)
}

// create new user
module.exports.create = user => {
    return models.user.create(values = user)
}

module.exports.getNotifications = userId => {
    return models.user.findByPk(
        userId,
        {include: ['notifications']}
    )
}