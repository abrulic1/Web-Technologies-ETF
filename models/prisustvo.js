const Sequelize = require("sequelize");
const sequelize = require("../baza");   //ovdje je importovana konekcija na bazu
 
//jedno prisustvo je samo za jednog studenta vezano

module.exports = function (sequelize, DataTypes) {
    const Prisustvo = sequelize.define('prisustvo', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
       sedmica: {
        type: Sequelize.INTEGER, 
        allowNull: false
       },
       predavanja: Sequelize.INTEGER,
       vjezbe: Sequelize.INTEGER,
       index: {
        type: Sequelize.INTEGER, 
        allowNull: false
       }
   },{
    createdAt: false,
    updatedAt: false
   });
   return Prisustvo;
}
