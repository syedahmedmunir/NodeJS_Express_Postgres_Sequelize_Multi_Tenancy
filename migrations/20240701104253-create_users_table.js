'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tenant_user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users');
  }
};
