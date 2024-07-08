const {apiResponse} = require('../helpers/helper');

exports.getAll = async (req, res) => {
  const { Student } = req.models;
  
  try {
    const students = await Student.findAll();
    apiResponse(res, {status: true, data: students});
  } catch (error) {
    apiResponse(res, {status: false, error: error.message});
  }
};
