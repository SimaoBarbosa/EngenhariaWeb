/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('regiao', {
    id_regiao: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'regiao'
  });
};
