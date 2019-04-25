/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evento', {
    id_evento: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
};
