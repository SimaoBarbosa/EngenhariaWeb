/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const desporto_regiao = sequelize.define('desporto_regiao', {
    desporto_id_desporto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'desporto',
        key: 'id_desporto'
      }
    },
    regiao_id_regiao: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'regiao',
        key: 'id_regiao'
      }
    }
  }, {
    tableName: 'desporto_regiao'
  });

  return desporto_regiao;

};
