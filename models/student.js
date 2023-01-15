const Sequelize = require("sequelize");
const sequelize = require("../baza");   //ovdje je importovana konekcija na bazu
 
//jedan student slusa vise predmeta
//jedan student ima vise zabiljezenih prisustva 

module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('student', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
       ime: {
        type: Sequelize.STRING, 
        allowNull: false
       },
       index:{
        type: Sequelize.INTEGER, 
        allowNull: false, 
        unique: true
       }
   },
   {
    createdAt: false,
    updatedAt: false
   });
   return Student;
}
