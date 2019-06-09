var models = require('../models/index')

// get concrete bets of user
module.exports.getApostasConcretas = seletores => {
    return models.aposta_concreta.findAll(seletores);
}

// create new concrete bet
module.exports.create = async bet => {
    let user = await models.user.findOne({
        attributes: ['saldo'],
        where: {
            oid: bet.user_oid
        }
    })

    if (!user){
        return {success: false, message: 'Utilizador não existe'}
    }

    if (user.saldo < bet.quantia){
        return {success: false, message: 'Utilizador não tem dinheiro suficiente'}
    }

    await models.user.decrement(
        ['saldo'],
        {
            by: bet.quantia,
            where: {oid: bet.user_oid}
        }
    )

    await models.aposta_concreta.create(values = bet);

    return {success: true}
}

// create new concrete bet
module.exports.fecharApostaDisponivel = async (id_aposta_disponivel, id_opcao) => {
    
    let apostas = await models.aposta_concreta.findAll({
        attributes: [
            'quantia', 
            'odd_fixada', 
            'id_opcao', 
            'user_oid', 
            'id_aposta_concreta', 
            'nome_opcao', 
            'nome_aposta_disponivel', 
            'nome_evento', 
            'nome_competicao'
        ],
        where: {
            id_aposta_disponivel: id_aposta_disponivel
        }
    })

    apostas.forEach(async ac => {

        if (ac.id_opcao == id_opcao){ // ganhou

            // atualizar resultado da aposta concreta
            await models.aposta_concreta.update(
                {resultado: 1},
                {where: {
                    id_aposta_concreta: ac.id_aposta_concreta
                }}
            )

            // atualizar saldo do user
            await models.user.increment(
                ['saldo'],
                {
                    by: ac.quantia * ac.odd_fixada,
                    where: {oid: ac.user_oid}
                }
            )

            // criar notificacao
            await models.notificacao.create(values = {
                notificacao: 'Ganhou ' + ac.quantia * ac.odd_fixada + ' ESScoins com a aposta realizada no evento \"' + 
                              ac.nome_evento + '\" (\"' + ac.nome_competicao  + '\"), na aposta \"' + ac.nome_aposta_disponivel +
                              '\", com a opção \"' + ac.nome_opcao + '\".',
                user_oid: ac.user_oid
            });

        } else { // perdeu

            // atualizar resultado da aposta concreta
            await models.aposta_concreta.update(
                {resultado: 0},
                {where: {
                    id_aposta_concreta: ac.id_aposta_concreta
                }}
            )

            // criar notificacao
            await models.notificacao.create(values = {
                notificacao: 'Perdeu a aposta realizada no evento \"' + ac.nome_evento + '\" (\"' + ac.nome_competicao +
                             '\"), na aposta \"' + ac.nome_aposta_disponivel + '\", com a opção \"' + ac.nome_opcao + '\".',
                user_oid: ac.user_oid
            });

        }

    });

    return {success: true}
}