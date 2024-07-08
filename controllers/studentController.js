// const { Student } = require('../models');

exports.getAll = async (req, res) => {

  const { Student } = req.models;
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
