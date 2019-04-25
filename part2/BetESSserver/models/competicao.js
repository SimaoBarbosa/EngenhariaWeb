/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('competicao', {
    id_competicao: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desporto_id_desporto: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'desporto',
        key: 'id_desporto'
      }
    },
    regiao_id_regiao: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'regiao',
        key: 'id_regiao'
      }
    }
  }, {
    tableName: 'competicao'
  });
};
