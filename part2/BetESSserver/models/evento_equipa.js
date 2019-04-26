/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const evento_equipa = sequelize.define('evento_equipa', {
    evento_id_evento: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'evento',
        key: 'id_evento'
      }
    },
    equipa_id_equipa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'equipa',
        key: 'id_equipa'
      }
    }
  }, {
    tableName: 'evento_equipa'
  });

  return evento_equipa;

};
