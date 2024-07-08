
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const dbConfig = config;
const systemConfig = {
    'ADMIN_TOKEN' : "yERTS1212.#41",
    'JWT_SECRET'  : "REW12.#?_31AxzU",
    'JWT_EXPIRE'  : "10h",
};

module.exports ={
    dbConfig,
    systemConfig
}