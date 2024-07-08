'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('students', {
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

    const databaseName = queryInterface.sequelize.config.database;

     // Insert a single record into the 'students' table
     await queryInterface.bulkInsert('students', [{
      name: databaseName,
      email: databaseName+'_ali@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('students');
  }
};
