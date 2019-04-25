/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('opcao', {
    id_opcao: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    opcao: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    odd: {
      type: "DOUBLE",
      allowNull: true
    },
    aposta_disponivel_id_aposta_di: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'aposta_disponivel',
        key: 'id_aposta_disponivel'
      }
    }
  }, {
    tableName: 'opcao'
  });
};
