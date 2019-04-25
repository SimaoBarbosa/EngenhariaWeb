/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aposta_disponivel', {
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
};
