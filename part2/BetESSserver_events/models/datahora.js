/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  
  const datahora = sequelize.define('datahora', {
    id_datahora: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'datahora'
  });

  return datahora;
  
};
