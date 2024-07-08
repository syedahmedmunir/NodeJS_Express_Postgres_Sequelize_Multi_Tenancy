
const jwt           = require('jsonwebtoken');
const {systemConfig}  = require('../config/config');

const JWT_SECRET    = systemConfig.JWT_SECRET;
const jwtVerify = (req, res, next) => {
    
    const token = req.headers.token ;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = jwtVerify;