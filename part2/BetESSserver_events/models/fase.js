/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const fase = sequelize.define('fase', {
    id_fase: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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

  fase.associate = (models) => {

    fase.belongsTo(models.competicao, {
      as: 'competicao',
      foreignKey: 'competicao_id_competicao'
    })

    fase.hasMany(models.evento, {
      as: 'eventos', 
      foreignKey: 'fase_id_fase'
    });
    
  };

  return fase;

};
