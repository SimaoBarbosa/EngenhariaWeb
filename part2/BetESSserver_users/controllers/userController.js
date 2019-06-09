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

// get specific user
module.exports.findUser = seletores => {
    return models.user.findOne(seletores);
}

// create new user
module.exports.create = user => {
    return models.user.create(values = user);
}

// remove user
module.exports.remove = userId => {
    return models.user.destroy({
        where: {
            oid: userId
        }
    })
}

// add amount of money
module.exports.adicionarQuantia = (userId, valor) => {
    return models.user.increment(
        ['saldo'],
        {
            by: valor,
            where: {oid: userId}
        }
    )
}

// make user VIP by paying 50 ESScoins
module.exports.tornarVIP_pagamento = async (userId) => {
    let group = await models.user.findOne({
        attributes: ['group', 'saldo'],
        where: {
            oid: userId
        }
    })

    if (!group){
        return {success: false, message: 'Utilizador não existe'}
    }
    
    if (group.group == 2){
        return {success: false, message: 'Utilizador em causa é funcionário'}
    }

    if (group.group == 3){
        return {success: false, message: 'Utilizador em causa já é VIP'}
    }

    if (group.saldo < 50){
        return {success: false, message: 'Utilizador não tem dinheiro suficiente'}
    }

    await models.user.decrement(
        ['saldo'],
        {
            by: 50,
            where: {oid: userId}
        }
    )

    await models.user.update(
        {group: 3},
        {where: {
            oid: userId
        }}
    )
    
    return {success: true}
}

// make user VIP
module.exports.tornarVIP = async (userId) => {
    let group = await models.user.findOne({
        attributes: ['group'],
        where: {
            oid: userId
        }
    })

    if (!group){
        return {success: false, message: 'Utilizador não existe'}
    }
    
    if (group.group == 2){
        return {success: false, message: 'Utilizador em causa é funcionário'}
    }

    if (group.group == 3){
        return {success: false, message: 'Utilizador em causa já é VIP'}
    }

    await models.user.update(
        {group: 3},
        { where: {
            oid: userId
        }}
    )
    
    return {success: true}
}

// make user normal
module.exports.tornarNormal = async (userId) => {
    let group = await models.user.findOne({
        attributes: ['group'],
        where: {
            oid: userId
        }
    })

    if (!group){
        return {success: false, message: 'Utilizador não existe'}
    }
    
    if (group.group == 2){
        return {success: false, message: 'Utilizador em causa é funcionário'}
    }

    if (group.group == 1){
        return {success: false, message: 'Utilizador em causa já é normal'}
    }

    await models.user.update(
        {group: 1},
        { where: {
            oid: userId
        }}
    )
    
    return {success: true}
}