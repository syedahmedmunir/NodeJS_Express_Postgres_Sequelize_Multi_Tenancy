
const {systemConfig}  = require('../config/config');

const ADMIN_TOKEN    = systemConfig.ADMIN_TOKEN;

const adminVerify = (req, res, next) => {
    const token = (req?.headers?.admin_token) ? (req?.headers?.admin_token).trim() :""
    if (token == null) return res.sendStatus(401);
    if (token != ADMIN_TOKEN) return res.sendStatus(403);
    next();
};

module.exports = adminVerify;