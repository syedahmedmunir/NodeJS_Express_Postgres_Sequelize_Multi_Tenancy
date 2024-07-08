'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
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
    await queryInterface.dropTable('classes');
  }
};
