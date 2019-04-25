/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aposta_concreta', {
    id_aposta_concreta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantia: {
      type: "DOUBLE",
      allowNull: true
    },
    odd_fixada: {
      type: "DOUBLE",
      allowNull: true
    },
    resultado: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'oid'
      }
    },
    opcao_id_opcao: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'opcao',
        key: 'id_opcao'
      }
    },
    aposta_disponivel_id_aposta_di: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'aposta_disponivel',
        key: 'id_aposta_disponivel'
      }
    }
  }, {
    tableName: 'aposta_concreta'
  });
};
