/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const notificacao = sequelize.define('notificacao', {
    id_notificacao: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    notificacao: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'oid'
      }
    }
  }, {
    tableName: 'notificacao'
  });

  return notificacao;

};
