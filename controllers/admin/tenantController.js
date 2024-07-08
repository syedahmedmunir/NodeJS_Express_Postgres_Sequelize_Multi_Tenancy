const {apiResponse} = require('../../helpers/helper');
const {Tenant}      = require('../../models/admin');

exports.getAll = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    apiResponse(res, {status: true, data: tenants});
  } catch (error) {
    apiResponse(res, {status: false, error: error.message});
  }
};
