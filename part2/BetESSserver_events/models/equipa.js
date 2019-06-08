/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const equipa = sequelize.define('equipa', {
    id_equipa: {
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
    tableName: 'equipa'
  });

  equipa.associate = (models) => {
    
    equipa.belongsToMany(models.competicao, {
      through: 'equipa_competicao',
      as: 'competicoes',
      foreignKey: 'equipa_id_equipa'
    });

    equipa.belongsToMany(models.evento, {
      through: 'evento_equipa',
      as: 'eventos',
      foreignKey: 'equipa_id_equipa'
    });

  };

  return equipa;

};
