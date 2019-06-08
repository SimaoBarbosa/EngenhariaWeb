/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const aposta_disponivel = sequelize.define('aposta_disponivel', {
    id_aposta_disponivel: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resultado_final: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    disponibilidade: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vip: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    evento_id_evento: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'evento',
        key: 'id_evento'
      }
    }
  }, {
    tableName: 'aposta_disponivel'
  });

  aposta_disponivel.associate = (models) => {

    aposta_disponivel.hasMany(models.opcao, {
      as: 'opcoes', 
      foreignKey: 'aposta_disponivel_id_aposta_di'
    });

    aposta_disponivel.belongsTo(models.evento, {
      as: 'evento', 
      foreignKey: 'evento_id_evento'
    });
    
  };

  return aposta_disponivel;
  
};
