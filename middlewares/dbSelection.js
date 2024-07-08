const { Sequelize }         = require('sequelize');
const {dbConfig}            = require('../config/config');
// const initializeModels      = require('../models');
const initializeModels      = require('../utils/initializeModels');
const Tenant                = require('../models/admin/tenant'); // Assuming your Tenant model is defined

const dynamicSequelizeMiddleware = async  (req, res, next) =>  {
    let dynamicDbName = dbConfig.database;

    if(req?.user?.db_name){
        dynamicDbName = req?.user?.db_name;
    }
    const dynamicConfig = { ...dbConfig, database: dynamicDbName };
    const sequelize = new Sequelize(dynamicConfig.database, dynamicConfig.username, dynamicConfig.password, dynamicConfig);

    req.models = initializeModels(sequelize,'tenant');
    next();
}

module.exports = dynamicSequelizeMiddleware;