const Sequelize = require("sequelize");
const sequelize = require("../baza");   //ovdje je importovana konekcija na bazu
 

//predmet jedan je vezan za jednog profesora, al dodat ce se foreign key automatski

module.exports = function (sequelize, DataTypes) {
    const Predmet = sequelize.define('predmet', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
       naziv: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
       },
       brojPredavanjaSedmicno: Sequelize.INTEGER,
       brojVjezbiSedmicno: Sequelize.INTEGER
   }, {
    createdAt: false,
    updatedAt: false
   });
   return Predmet;
}
