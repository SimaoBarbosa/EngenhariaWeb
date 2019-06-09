var models = require('../models/index')

// get notifications of user
module.exports.notificacoesUser = userId => {
    return models.notificacao.findAll({
        where: {
            user_oid: userId
        }
    })
}

// delete notification
module.exports.remove = notificacaoId => {
    return models.notificacao.destroy({
        where: {
            id_notificacao: notificacaoId
        }
    })
}