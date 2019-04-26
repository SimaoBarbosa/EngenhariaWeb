/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const group_module = sequelize.define('group_module', {
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

  return group_module;

};
