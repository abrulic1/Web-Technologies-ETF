const Sequelize = require("sequelize");
const sequelize = require("./baza.js");   //ovdje je importovana konekcija na bazu
 
//biljeske za mene: ne definisem rucno foreign key, jer ce se automatski dodati kada dodam veze
//imamo i predmete, al jedan profesor moze imati vise predmeta, jedan predmet je vezan za jednog profesora, tako da cemo to kroz relaciju izmedju modela kasnije regulisati

module.exports = function (sequelize, DataTypes) {
    const Nastavnik = sequelize.define('nastavnik', {
       id: {
        typeof: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
       username: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
       },
       password_hash:{
        type: Sequelize.STRING, 
        allowNull: false
       }
   });
   return Nastavnik;
}
