'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const db        = {};
const {getPath} = require('../helpers/helper');

const initializeModels=(sequelize,type='admin')=> {

    let models_path = getPath('models/admin');
    if(type=='tenant'){
        models_path = getPath('models');
    }

    const  ignoreFiles = ['index.js'];

    const files =fs.readdirSync(models_path)
      .filter(file => {
          return (
              file.indexOf('.') !== 0 &&
              file !== basename &&
              file.slice(-3) === '.js' &&
              file.indexOf('.test.js') === -1 &&
              !ignoreFiles.includes(file)
              
          );
      });

      files.forEach(file => {
          const model = require(path.join(models_path, file))(sequelize, Sequelize.DataTypes);
          db[model.name] = model;
      });

  Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
          db[modelName].associate(db);
      }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}

module.exports = initializeModels;