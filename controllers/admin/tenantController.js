const { Tenant } = require('../../models/admin');

exports.getAll = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


