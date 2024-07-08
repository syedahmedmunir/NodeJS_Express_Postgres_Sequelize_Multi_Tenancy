const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const runMigrations = async (dbConfig,type="admin") => {
  try {
    const sequelize = new Sequelize(dbConfig);


    let migration_path = 'migrations/admin/*.js';
    if(type=="tenant"){
      migration_path = 'migrations/*.js';
    }

    const umzug = new Umzug({
      migrations  : { glob: migration_path },
      context     : sequelize.getQueryInterface(),
      storage     : new SequelizeStorage({ sequelize }),
      logger      : console,
    });

    let migration_status = await umzug.up();

    console.log('dbConfig',dbConfig,migration_status);

    let migration_action = migration_status.map((val) => 'Migrated '+  val.name );
    let migration_message = "Migrations Run Successfully";
    if(migration_action.length == 0){
      migration_message = "Migrations Already Up To Date";
    }

    return {status:true , 'message':migration_message ,'action':migration_action};
    
  } catch (error) {
    return {status:false , 'message':'Unable to connect to the database or run migrations:'+ error};
  }

}
const rollbackMigrations = async (dbConfig,type="admin") => {
  try {
    const sequelize = new Sequelize(dbConfig);

    let migration_path = 'migrations/admin/*.js';
    if(type=="tenant"){
      migration_path = 'migrations/*.js';
    }

    const umzug = new Umzug({
      migrations  : { glob: migration_path },
      context     : sequelize.getQueryInterface(),
      storage     : new SequelizeStorage({ sequelize }),
      logger      : console,
    });

    let migration_status = await umzug.down();
    let migration_action = migration_status.map((val) => 'Rolled Back '+  val.name );
    let migration_message = "Migration Rollback Successfully";
    return {status:true , 'message':migration_message ,'action':migration_action};
    
  } catch (error) {
    return {status:false , 'message':'Unable to connect to the database or run migrations:', error};
  }

}

module.exports = {runMigrations,rollbackMigrations};