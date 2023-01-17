const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
const { Sequelize, sequelize, Nastavnik, Predmet, Prisustvo, Student, PredmetStudent } = require('./baza');
sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'html')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
}));

//index page igdje?


app.get('/prijava(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})


app.post('/login(.html)?', (req, res) => {
    const data = Nastavnik.findAll()
        .then(data => {
            const users = data.map(user => user.dataValues);
            const user = users.find(objekat => objekat.username === req.body.username);
            if (user) {
                bcrypt.compare(req.body.password, user.password_hash, function (err, result) {
                    if (err) {
                        console.error(err);
                    } else if (result) {
                        req.session.user = user;
                        Predmet.findAll().then(sviPredmeti => {
                            let profesoroviPredmeti = sviPredmeti.map(p => p.dataValues);;
                            profesoroviPredmeti = profesoroviPredmeti.filter(p => p.nastavnikId === req.session.user.id);
                            //  profesoroviPredmeti = profesoroviPredmeti.map(p=>p.naziv);
                            req.session.predmeti = profesoroviPredmeti;
                            //  console.log('Profesorovi predmeti su: ', req.session.predmeti);
                            const poruka = {
                                "poruka": "Uspješna prijava"
                            }
                            res.status(200).send(JSON.stringify(poruka));
                        })
                    } else {
                        const poruka = {
                            "poruka": "Neuspješna prijava"
                        }
                        res.status(404).send(JSON.stringify(poruka));
                    }
                });
            } else
                res.status(404).send('Nema takvog korisnika');
        })
        .catch(err => {
            console.error(err);
        });
})


app.post("/logout(.html)?", (req, res) => {
    req.session.user = null;
    req.session.predmeti = null;
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})


app.get('/predmeti(.html)?', (req, res) => {
    if (req.session.user)
        res.status(200).json(req.session.predmeti);
    else
        res.status(400).send(JSON.stringify({ greska: 'Korisnik nije loginovan' }));
})


app.get('/predmet/:naziv', (req, res) => {
    let vrati = {};
    naziv = req.params.naziv;
    PredmetStudent.findAll().then(data => {
        data = data.map(d => d.dataValues);
        let studentiId = [];
        let predmetId = 0;
        let indexNasegPredmeta = 0;
        for (let i = 0; i < req.session.predmeti.length; i++)
            if (req.session.predmeti[i].naziv === naziv) {
                predmetId = req.session.predmeti[i].id;
                indexNasegPredmeta = i;
                break;
            }
        
        for (let i = 0; i < data.length; i++) 
            if (data[i].predmetId === predmetId)
                studentiId.push(data[i].studentId);
            
        Student.findAll().then(data => {
            data = data.map(d => d.dataValues);
            let studenti = [];
            for (let i = 0; i < data.length; i++) {
                if (studentiId.includes(data[i].id))
                    studenti.push(data[i]);
            }

            vrati.studenti = studenti;

            Prisustvo.findAll().then(data => {
                data = data.map(d => d.dataValues);
                // console.log('dateajdna ', data);
                let prisustva = [];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].predmetId === predmetId)
                        prisustva.push(data[i]);
                }

                vrati.prisustva = prisustva;
                vrati.predmet = naziv;
                vrati.brojPredavanjaSedmicno = req.session.predmeti[indexNasegPredmeta].brojPredavanjaSedmicno;
                vrati.brojVjezbiSedmicno = req.session.predmeti[indexNasegPredmeta].brojVjezbiSedmicno;
                if (vrati) {
                    // console.log('OVDJE SU NAM PRISUSTVA SAD ', vrati)
                    console.log('tundertf ', vrati);
                    res.status(200).send(vrati)
                }
                else
                    res.status(404).send('neispravno');


            })
        })

    })
})



app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
    const { index, naziv } = req.params;
    const prisustvo = req.body;
    //citanje iz tabele prisustvo ovdje idemo
    let prisustvaPredmeta = fs.readFileSync(path.join(__dirname, 'data', 'prisustva.json'));
    prisustvaPredmeta = JSON.parse(prisustvaPredmeta);
    let indexPredmeta = 0;
    let nasPredmet = null;
    for (let k = 0; k < prisustvaPredmeta.length; k++) {
        if (prisustvaPredmeta[k].predmet === naziv) {
            nasPredmet = prisustvaPredmeta[k];
            indexPredmeta = k;
        }
    }

    let indexZaAzuriranje = 0;
    //ovdje ide izmjena u bazi
    for (let j = 0; j < nasPredmet.prisustva.length; j++) {
        if (parseInt(nasPredmet.prisustva[j].sedmica) === parseInt(prisustvo.sedmica) && parseInt(nasPredmet.prisustva[j].index) === parseInt(parseInt(index))) {
            indexZaAzuriranje = j;
            nasPredmet.prisustva[j].predavanja = prisustvo.predavanja;
            nasPredmet.prisustva[j].vjezbe = prisustvo.vjezbe;
            prisustvaPredmeta[indexPredmeta].prisustva[j].predavanja = prisustvo.predavanja;
            prisustvaPredmeta[indexPredmeta].prisustva[j].vjezbe = prisustvo.vjezbe;
            break;
        }

        //u slucaju da moramo dodoati sedmicu i informacije o njoj
        //ovdje sad ide ubacivanje u bazu
        if (j === nasPredmet.prisustva.length - 1)
            prisustvaPredmeta[indexPredmeta].prisustva.splice(j + 1, 0, { "sedmica": prisustvo.sedmica, "predavanja": prisustvo.predavanja, "vjezbe": prisustvo.vjezbe, "index": parseInt(index) });
    }

    //ovo nista sad, samo vracanje predmeta
    fs.writeFileSync(path.join(__dirname, 'data', 'prisustva.json'), JSON.stringify(prisustvaPredmeta, null, 2));
    res.status(200).send(nasPredmet);
})

app.listen(3000);


//imam vise puta citanje u iz prisustva i profesora a trebat ce vrv i za ostale, tkd to bi bilo dobro da se izdvoji u neke metode da se
//ne duplira kod
