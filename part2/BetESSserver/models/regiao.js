/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  
  const regiao = sequelize.define('regiao', {
    id_regiao: {
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
    tableName: 'regiao'
  });

  regiao.associate = (models) => {
    
    regiao.belongsToMany(models.desporto, {
      through: 'desporto_regiao',
      as: 'desportos',
      foreignKey: 'regiao_id_regiao'
    });

    regiao.hasMany(models.competicao, {
      as: 'competicoes',
      foreignKey: 'user_oid'
    });
    
  };

  return regiao;

};
