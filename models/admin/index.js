'use strict';

const Sequelize          = require('sequelize');
const initializeModels   = require('../../utils/initializeModels');
const {dbConfig}         = require('../../config/config');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const db        = initializeModels(sequelize);

module.exports = db;