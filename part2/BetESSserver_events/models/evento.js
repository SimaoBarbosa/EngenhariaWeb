/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const evento = sequelize.define('evento', {
    id_evento: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fase_id_fase: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'fase',
        key: 'id_fase'
      }
    },
    datahora_datahora_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'datahora',
        key: 'id_datahora'
      }
    }
  }, {
    tableName: 'evento'
  });

  evento.associate = (models) => {

    evento.belongsTo(models.datahora, {
      as: 'datahora', 
      foreignKey: 'datahora_datahora_id'
    });

    evento.belongsTo(models.fase, {
      as: 'fase',
      foreignKey: 'fase_id_fase'
    });

    evento.belongsToMany(models.equipa, {
      through: 'evento_equipa',
      as: 'equipas',
      foreignKey: 'evento_id_evento'
    });

    evento.hasMany(models.aposta_disponivel, {
      as: 'apostas_disponiveis', 
      foreignKey: 'evento_id_evento'
    });
    
  };

  return evento;

};
