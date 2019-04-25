/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('desporto', {
    id_desporto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'desporto'
  });
};
