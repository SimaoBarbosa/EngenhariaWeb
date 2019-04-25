/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group', {
    oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    groupname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    module_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'module',
        key: 'oid'
      }
    }
  }, {
    tableName: 'group'
  });
};
