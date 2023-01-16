const Sequelize = require("sequelize");
const sequelize = require("../baza");   //ovdje je importovana konekcija na bazu

module.exports = function (sequelize, DataTypes) {
const PredmetStudent = sequelize.define('predmetstudent', {
  studentId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'student',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  predmetId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'predmet',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
}, {
    createdAt: false,
    updatedAt: false
   });
   return PredmetStudent;
}