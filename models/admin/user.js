'use strict';
const { Model } = require('sequelize');
  

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Tenant, { foreignKey: 'user_id' });
    }
  }
  User.init({
     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    v_code: DataTypes.STRING,
    is_approved: DataTypes.STRING,
    tenant_id: DataTypes.INTEGER,
    is_main_user: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};