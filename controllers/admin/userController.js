const {runMigrations,rollbackMigrations} = require('../../utils/runMigrations');
const {dbConfig} = require('../../config/config');
const {generateRand}  = require('../../helpers/helper');
const { Client } = require('pg');
const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcryptjs');
const { User ,Tenant } = require('../../models/admin');


exports.login = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  try {
    if (user && await bcrypt.compare(password, user.password)) {
      const token = await generateToken(user);
      
      res.json({ user,token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.createTenantUser = async (req, res) => {


  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let create_data ={
    ...req.body                       ,
    password      : hashedPassword    ,
    v_code        : null              ,
    is_main_user  : 0    
  };

  try {
    const user = await User.create(create_data);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.create = async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let create_data ={
    ...req.body                       ,
    v_code        : generateRand(20)  ,
    is_main_user  : 1                 ,
    password      : hashedPassword
  };

  try {
    const user = await User.create(create_data);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyTenantUser = async (req, res) => {

  const {code} = req.query;

  try {
      const user = await User.findOne({
        where: {
          v_code: code,
        },
      });

      if(user){

        const db_name = ('tenant_'+user.id+"_"+user.username).toLowerCase();

        // Create a new tenant entry
        const tenant = await Tenant.create({
          user_id: user.id,
          db_name
        });

        const client = new Client({
          user    : dbConfig.username,
          host    : dbConfig.host,
          database: dbConfig.database,
          password: dbConfig.password,
          port    : dbConfig.port,
        });

        await client.connect();
        await client.query(`CREATE DATABASE ${db_name}`);
        await client.end();

        const newDbConfig = {
          username: dbConfig.username,
          password: dbConfig.password,
          database: db_name,
          host    : dbConfig.host,
          dialect : 'postgres',
          storage : './db.postgres'
        };

        await runMigrations(newDbConfig,'tenant');

        user.v_code = "";
        user.is_approved = 1;
        user.tenant_id = tenant.id;
        await user.save();

        res.status(200).json({'status':true ,'Message':'Successfully Verified User'});

      }else{
        res.status(200).json({'status':true ,'Message':'No User Found'});

      }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {

  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.runMigrations = async (req, res) => {
  try {
   let result =  await runMigrations(dbConfig);
   if(result.status == false){
    res.status(400).json({ error: result.message });
    
   }else{
    res.status(200).json({'message':result.message,'action':result.action});
   }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.rollbackMigrations = async (req, res) => {
  try {
   let result =  await rollbackMigrations(dbConfig);
   if(result.status == false){
    res.status(400).json({ error: result.message });
    
   }else{
    res.status(200).json({'message':result.message,'action':result.action});
   }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.runTenantMigrations = async (req, res) => {

  try {

    const tenants = await Tenant.findAll();
    let errors=[]
    let messages = [];
    if(tenants.length ==0){
      messages.push('No Tenants Found');
    }
    for (const tenant of tenants) {

      const db_config = {...dbConfig,database:tenant.db_name};
      let result =  await runMigrations(db_config,'tenant');
      if(result.status == false){
        errors.push(result.message+" On Database "+tenant.db_name);
      }else{
        const action =  {'Database':tenant.db_name, 'message':result.message,'action':result.action};
        messages.push(action);
      }
    }

    if(errors.length > 0){
      res.status(400).json({ errors });

    }else{
      res.status(200).json({messages});
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rollbackTenantMigrations = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    let errors=[]
    let messages = [];

    if(tenants.length ==0){
      messages.push('No Tenants Found');
    }
    for (const tenant of tenants) {

      const db_config = {...dbConfig,database:tenant.db_name};
      let result =  await rollbackMigrations(db_config,'tenant');
      if(result.status == false){
        errors.push(result.message+" On Database "+tenant.db_name);
      }else{
        const action =  {'Database':tenant.db_name, 'message':result.message,'action':result.action};
        messages.push(action);
      }
    }

    if(errors.length > 0){
      res.status(400).json({ errors });

    }else{
      res.status(200).json({messages});
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
