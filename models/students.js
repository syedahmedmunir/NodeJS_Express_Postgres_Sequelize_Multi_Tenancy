'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            // Define associations if needed
            // For example:
            // Student.belongsTo(models.Class); // If Student belongs to a Class
        }
    }
    Student.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Student', // Model name
        tableName: 'students', // Table name in the database
    });
    return Student;
};