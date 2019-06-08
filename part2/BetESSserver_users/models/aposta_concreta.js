/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const aposta_concreta = sequelize.define('aposta_concreta', {
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
    id_aposta_disponivel: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    id_opcao: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    nome_opcao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nome_aposta_disponivel: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nome_evento: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nome_competicao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'oid'
      }
    },
  }, {
    tableName: 'aposta_concreta'
  });

  aposta_concreta.associate = (models) => {

    aposta_concreta.belongsTo(models.user, {
      as: 'user', 
      foreignKey: 'user_oid'
    });
    
  };

  return aposta_concreta;

};
