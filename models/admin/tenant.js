'use strict';
const { Model } = require('sequelize');
  

module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tenant.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Tenant.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    db_name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'tenants',
    modelName: 'Tenant',
  });
  return Tenant;
};