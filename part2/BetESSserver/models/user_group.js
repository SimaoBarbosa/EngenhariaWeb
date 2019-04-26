/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const user_group = sequelize.define('user_group', {
    user_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'oid'
      }
    },
    group_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'group',
        key: 'oid'
      }
    }
  }, {
    tableName: 'user_group'
  });

  return user_group;

};
