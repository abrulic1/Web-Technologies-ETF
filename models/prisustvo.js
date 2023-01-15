const Sequelize = require("sequelize");
const sequelize = require("./baza.js");   //ovdje je importovana konekcija na bazu
 
//jedno prisustvo je samo za jednog studenta vezano

module.exports = function (sequelize, DataTypes) {
    const Prisustvo = sequelize.define('prisustvo', {
       id: {
        typeof: Sequelize.INTEGER,
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
   });
   return Prisustvo;
}
