const express           = require('express');
const routes            = express.Router();
const jwtVerify         = require('../middlewares/jwtVerify');
const dbSelection       = require('../middlewares/dbSelection');
const studentController = require('../controllers/studentController');

routes.use(jwtVerify);
routes.use(dbSelection);

routes.get('/students', studentController.getAll);

module.exports = routes;