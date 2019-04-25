/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group_module', {
    group_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'group',
        key: 'oid'
      }
    },
    module_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'module',
        key: 'oid'
      }
    }
  }, {
    tableName: 'group_module'
  });
};
