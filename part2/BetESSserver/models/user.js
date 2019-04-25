/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    saldo: {
      type: "DOUBLE",
      allowNull: true
    },
    group_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'group',
        key: 'oid'
      }
    }
  }, {
    tableName: 'user'
  });
};
