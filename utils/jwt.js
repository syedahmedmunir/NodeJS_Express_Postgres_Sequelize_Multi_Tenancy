const jwt               = require('jsonwebtoken');
const {systemConfig}    = require('../config/config');
const { Tenant }        = require('../models/admin');

const JWT_SECRET        = systemConfig.JWT_SECRET;
const expiry            = systemConfig.JWT_EXPIRE;

const generateToken = async (user) => {
    const tenant = await Tenant.findOne({where : { id:  user.tenant_id  }});
    return jwt.sign({ id: user.id, tenant_id: user.tenant_id,db_name: tenant.db_name }, JWT_SECRET, { expiresIn: expiry });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
};