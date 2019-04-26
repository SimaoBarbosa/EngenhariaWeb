/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {

  return sequelize.define('module', {
    oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
