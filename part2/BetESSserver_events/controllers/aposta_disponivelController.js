var models = require('../models/index')

// get all apostas_disponivel
module.exports.getAll = (seletores) => {
    return models.aposta_disponivel.findAll({
        where : seletores,
        include:['opcoes','evento']
    })
}

// update odd of opcao
module.exports.updateOdd = (idopcao,odd) => {
    return models.opcao.update(
        { odd : odd },
        { where: { id_opcao: idopcao } }
    )
}

//create new aposta disponivel
module.exports.create = data => {
    return models.aposta_disponivel.create(values = data );
}

// End aposta disponivel
module.exports.endBet = (id_opcao,id_aposta) => {
    return models.aposta_disponivel.update( 
        {
            resultado_final: id_opcao,
            disponibilidade: false
        },
        {
            where: {
                id_aposta_disponivel:id_aposta
            }
        } 
    );
}

// End aposta disponivel
module.exports.usersNotUpdated = (id_opcao,id_aposta) => {
    return models.aposta_disponivel.update( 
        {
            resultado_final: -2 - id_opcao,
        },
        {
            where: {
                id_aposta_disponivel: id_aposta
            }
        } 
    );
}

// make aposta disponivel available
module.exports.makeAvailable = (id_aposta) => {
    return models.aposta_disponivel.update(
        { disponibilidade : true },
        { where: { id_aposta_disponivel: id_aposta } }
      )
}

// check if bet is available
module.exports.isAvailable = (id_aposta) => {
    return models.aposta_disponivel.findOne({
        attributes: ['disponibilidade'],
        where: {
            id_aposta_disponivel: id_aposta
        }
    })
}

// check if bet is available and VIP
module.exports.isAvailableAndVIP = (id_aposta) => {
    return models.aposta_disponivel.findOne({
        attributes: ['disponibilidade', 'vip'],
        where: {
            id_aposta_disponivel: id_aposta
        }
    })
}
