'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenant_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      is_main_user: {
        type: Sequelize.SMALLINT,
        defaultValue:0
      },
      username: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_approved: {
        type: Sequelize.SMALLINT,
        defaultValue:0
      },
      v_code: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users');
  }
};