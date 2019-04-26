var models = require('../models/index')

// get notifications of user
module.exports.notificationsUser = userId => {
    return models.notificacao.findAll({
        where: {
            user_oid: userId
        }
    })
}