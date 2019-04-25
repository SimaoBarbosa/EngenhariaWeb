/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('module', {
    oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    moduleid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    modulename: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'module'
  });
};
