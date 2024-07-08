const express               = require('express');
const admin_routes          = express.Router();
const userController        = require('../../controllers/admin/userController');
const tenantController      = require('../../controllers/admin/tenantController');
const adminVerify           = require('../../middlewares/adminVerify');
admin_routes.use(adminVerify);


admin_routes.post('/login', userController.login);
admin_routes.post('/users', userController.create);
admin_routes.post('/tenant_user', userController.createTenantUser);
admin_routes.get('/verify-users', userController.verifyTenantUser);
admin_routes.get('/users', userController.getAll);
admin_routes.get('/tenants', tenantController.getAll);
admin_routes.get('/run_migrations', userController.runMigrations);
admin_routes.get('/rollback_migrations', userController.rollbackMigrations);
admin_routes.get('/run_tenant_migrations', userController.runTenantMigrations);
admin_routes.get('/rollback_tenant_migrations', userController.rollbackTenantMigrations);

module.exports = admin_routes;