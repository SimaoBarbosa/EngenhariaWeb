/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fase', {
    id_fase: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    competicao_id_competicao: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'competicao',
        key: 'id_competicao'
      }
    }
  }, {
    tableName: 'fase'
  });
};
