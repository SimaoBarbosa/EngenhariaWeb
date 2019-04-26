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
    user_oid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'oid'
      }
    },
    opcao_id_opcao: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'opcao',
        key: 'id_opcao'
      }
    },
    aposta_disponivel_id_aposta_di: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'aposta_disponivel',
        key: 'id_aposta_disponivel'
      }
    }
  }, {
    tableName: 'aposta_concreta'
  });

  aposta_concreta.associate = (models) => {

    aposta_concreta.hasOne(models.aposta_disponivel, {
      as: 'aposta_disponivel', 
      foreignKey: 'aposta_disponivel_id_aposta_di'
    });

    
    aposta_concreta.hasOne(models.opcao, {
      as: 'opcao', 
      foreignKey: 'opcao_id_opcao'
    });

    aposta_concreta.hasOne(models.user, {
      as: 'user', 
      foreignKey: 'user_oid'
    });
    
  };

  return aposta_concreta;

};
