/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const user = sequelize.define('user', {
    oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    saldo: {
      type: "DOUBLE",
      allowNull: true
    },
    group: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    tableName: 'user'
  });

  user.associate = function (models){
    
    user.hasMany(models.notificacao, {
      as: 'notificacoes', 
      foreignKey: 'user_oid'
    });
    
    user.hasMany(models.aposta_concreta, {
      as: 'apostas', 
      foreignKey: 'user_oid'
    });
    
  };

  return user;

};
