/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const desporto = sequelize.define('desporto', {
    id_desporto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'desporto'
  });

  desporto.associate = (models) => {
    
    desporto.belongsToMany(models.regiao, {
      through: 'desporto_regiao',
      as: 'regioes',
      foreignKey: 'desporto_id_desporto'
    });

    desporto.hasMany(models.competicao, {
      as: 'competicoes',
      foreignKey: 'desporto_id_desporto'
    });
    
  };

  return desporto;

};
