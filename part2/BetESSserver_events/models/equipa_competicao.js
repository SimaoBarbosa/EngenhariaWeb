/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const equipa_competicao = sequelize.define('equipa_competicao', {
    equipa_id_equipa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'equipa',
        key: 'id_equipa'
      }
    },
    competicao_id_competicao: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'competicao',
        key: 'id_competicao'
      }
    }
  }, {
    tableName: 'equipa_competicao'
  });

  return equipa_competicao;

};
