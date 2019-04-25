/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datahora', {
    id_datahora: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'datahora'
  });
};
