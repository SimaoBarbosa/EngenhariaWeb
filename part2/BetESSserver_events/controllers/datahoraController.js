var models = require('../models/index')

// create new datahora
module.exports.create = datahora => {
    return models.datahora.create(values = datahora);
}

// check if datahora already exists
module.exports.exists = (dataI, horaI) => {
    return models.datahora.count({
        where: {
            data: dataI,
            hora: horaI
        }
    }).then(count => {
        if (count != 0) return true;
        return false;
    });
}

// get id of datahora with certain date and time
module.exports.getId = (dataI, horaI) => {
    return models.datahora.findOne({
        attributes: ['id_datahora'],
        where: {
            data: dataI,
            hora: horaI
        }
    })
}