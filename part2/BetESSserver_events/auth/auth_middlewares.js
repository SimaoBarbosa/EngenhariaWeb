exports.verifyFuncionario = function (req, res, next){
    if (req.body.user_group_id == 2)
        next();
    else
        return res.status(500).send({ auth: false, message: 'Falha de autenticação. Apenas Funcionários permitidos' });
};

exports.verifyApostador = function (req, res, next){
    let group = req.body.user_group_id
    if (group == 1 || group == 2 || group == 3)
        next();
    else
        return res.status(500).send({ auth: false, message: 'Falha de autenticação.' });
};

exports.verifyVIP = function (req, res, next){
    let group = req.body.user_group_id
    if (group == 2 || group == 3)
        next();
    else
        return res.status(500).send({ auth: false, message: 'Falha de autenticação. Apenas Funcionários ou VIPs permitidos.' });
};