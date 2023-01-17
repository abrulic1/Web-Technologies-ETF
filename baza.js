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


/*RELACIJE:
   -1 nastavnik ima vise predmeta
   -1 predmet ima 1 nastavnika 
   -1 predmet ima vise studenata
   -1 student ima vise predmeta
   -1 student ima vise prisustva
   -1 prisustvo je vezano za 1 studenta

*/
const Nastavnik = require('./models/nastavnik')(sequelize);
const Predmet = require('./models/predmet')(sequelize);
const Prisustvo = require('./models/prisustvo')(sequelize);
const Student = require('./models/student')(sequelize);
const PredmetStudent = require('./models/predmetstudent')(sequelize);

Nastavnik.hasMany(Predmet, {foreignKey: {
  name: 'nastavnikId',
  allowNull: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
   }
});
// Predmet.belongsToMany(Student, {through: 'PredmetStudent'});
Predmet.belongsToMany(Student, { through: PredmetStudent });
Student.belongsToMany(Predmet, { through: PredmetStudent });
// Prisustvo.belongsTo(Student, {foreignKey: 'index', targetKey: 'index'});  - ovo necu da radim jer ako se index promijeni ode sve, bolja je praksa na PK ici
Prisustvo.belongsTo(Student, {
  foreignKey: {
      name: 'studentId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  }
});
Prisustvo.belongsTo(Predmet, {
  foreignKey: {
    name: 'predmetId',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}
})
module.exports = {Sequelize, sequelize, Nastavnik, Predmet, Prisustvo, Student, PredmetStudent};