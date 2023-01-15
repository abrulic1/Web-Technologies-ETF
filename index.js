const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');


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
    const data = fs.readFileSync(path.join(__dirname, 'data', 'nastavnici.json'));
    const users = JSON.parse(data);
    const user = users.find(objekat => objekat.nastavnik.username === req.body.username);
    if (user) {
        bcrypt.compare(req.body.password, user["nastavnik"].password_hash, function (err, result) {
            if (err) {
                console.error(err);
            } else if (result) {
                req.session.user = user;
                const poruka = {
                    "poruka": "Uspješna prijava"
                }
                res.status(200).send(JSON.stringify(poruka));
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


app.post("/logout(.html)?", (req, res) => {
    req.session.user = null;
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})

app.get('/predmeti(.html)?', (req, res) => {
    if (req.session.user)
        res.status(200).json(req.session.user.predmeti);
    else
        res.status(400).send(JSON.stringify({ greska: 'Korisnik nije loginovan' }));
})

app.get('/predmet/:naziv', (req, res) => {
    naziv = req.params.naziv;
    let prisustvoPoPredmetima = fs.readFileSync(path.join(__dirname, 'data', 'prisustva.json'));
    prisustvoPoPredmetima = JSON.parse(prisustvoPoPredmetima);
    let prisustva = prisustvoPoPredmetima.find(p => p.predmet === naziv);
    if (prisustva)
        res.status(200).send(prisustva)
    else
        res.status(404).send('neispravno');
})

app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
    const { index, naziv } = req.params;
    const prisustvo = req.body;
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
        if (j === nasPredmet.prisustva.length - 1)
            prisustvaPredmeta[indexPredmeta].prisustva.splice(j + 1, 0, { "sedmica": prisustvo.sedmica, "predavanja": prisustvo.predavanja, "vjezbe": prisustvo.vjezbe, "index": parseInt(index) });
    }

    fs.writeFileSync(path.join(__dirname, 'data', 'prisustva.json'), JSON.stringify(prisustvaPredmeta, null, 2));
    res.status(200).send(nasPredmet);
})

app.listen(3000);