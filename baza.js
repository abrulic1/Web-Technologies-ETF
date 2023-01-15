const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
   pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
   }
 }
);


// async function checkConnection(){
// try {
//     // await sequelize.authenticate();
//     // console.log('Uspjesno ste konektovani na bazu');
//   } catch (error) {
//     console.error('Problem prilokom pokusaja konekcije na bazu', error);
//   }
// }

// checkConnection();

const Nastavnik = require('./models/nastavnik')(sequelize);
const Predmet = require('./models/predmet')(sequelize);
const Prisustvo = require('./models/prisustvo')(sequelize);
const Student = require('./models/student')(sequelize);

Nastavnik.hasMany(Predmet);
Predmet.belongsToMany(Student, {through: 'PredmetStudent'});
Prisustvo.belongsTo(Student, {foreignKey: 'index', targetKey: 'index'});

module.exports = {Sequelize, sequelize, Nastavnik, Predmet, Prisustvo, Student};