var models = require('../models/index')

// check login
module.exports.checkLogin = async (user, password) => {
    let u = await models.user.findOne({
        attributes: ['oid', 'username', 'password', 'group'],
        where: {username: user}
    })

    if (!u){ // user don't exist
        return {
            success: false,
            error: 1
        }
    } else { // user found
        if (password == u.password){ // good login
            return {
                success: true,
                oid: u.oid,
                group: u.group
            }
        } else { // bad password
            return {
                success: false,
                error: 2
            }
        }
    }

    //return models.user.create(values = user);
}

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