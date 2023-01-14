const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
const { type } = require('os');

//to have an access to css files and other in public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public', 'html')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));

//index page igdje?

app.get('/prijava(.html)?', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})

app.post('/login(.html)?', (req, res)=>{
    
    const data = fs.readFileSync(path.join(__dirname, 'data', 'nastavnici.json'));
    const users = JSON.parse(data);

    const user = users.find(objekat => objekat.nastavnik.username===req.body.username);
    if(user){
    bcrypt.compare(req.body.password, user["nastavnik"].password_hash, function(err, result) {
        if (err) {
          console.error(err);
        } else if (result) {
            req.session.user=user;
            const poruka ={
             "poruka":"Uspješna prijava"
            }
            res.status(200).send(JSON.stringify(poruka));
        } else {
            const poruka ={
             "poruka":"Neuspješna prijava"
            }
            res.status(404).send(JSON.stringify(poruka));
          }
         });
       }else
      res.status(404).send('Nema takvog korisnika');   
})


app.post("/logout(.html)?", (req, res) => {
    req.session.user=null;
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})

app.get('/predmeti(.html)?', (req, res)=>{
        if(req.session.user){
            res.status(200).json(req.session.user.predmeti);
            // res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'predmeti.html'));
        }
        else
        res.status(200).send(JSON.stringify({greska: 'Korisnik nije loginovan'}));
    })

app.get('/predmet/:naziv', (req, res)=>{
    // console.log(req.params.naziv);
    naziv = req.params.naziv;
    let prisustvoPoPredmetima = fs.readFileSync(path.join(__dirname,'data','prisustva.json'));
    prisustvoPoPredmetima = JSON.parse(prisustvoPoPredmetima);
    //console.log('tip prisustvaPoPredmetima je: ', typeof prisustvoPoPredmetima, prisustvoPoPredmetima.length)
    //trazim predmet iz prisustvaPoPredmetima koji je jednak poslanom nazivu predmeta, i iz njega uzimam prisustva 
    // console.log('prisustvooogrkgmkfgnklesgfv: ', prisustvoPoPredmetima[0].predmet);
    let prisustva =  prisustvoPoPredmetima.find(p=>p.predmet===naziv);
    // console.log('prisustva su: ', prisustva, typeof prisustva)
    if(prisustva){
        // console.log(prisustva);
    res.status(200).send(prisustva)
    }
    else 
    res.status(404).send('neispravno');
})    

app.post('/prisustvo/predmet/:naziv/student/:index', (req, res)=>{
    
    const index = req.params.index;
    const naziv = req.params.naziv;
    const prisustvo = req.body; 
    console.log('INDEEEEX ', index, naziv, prisustvo);
    let prisustvaPredmeta = fs.readFileSync(path.join(__dirname, 'data', 'prisustva.json'));
    prisustvaPredmeta = JSON.parse(prisustvaPredmeta);
    let indexPredmeta = 0;
    let nasPredmet=null;
    for(let k=0; k<prisustvaPredmeta.length; k++){
        if(prisustvaPredmeta[k].predmet===naziv){
            nasPredmet=prisustvaPredmeta[k];
             indexPredmeta=k;
        }
    }

     console.log('nas predmet je ', nasPredmet);
    let indexZaAzuriranje=0;
     for(let j=0; j<nasPredmet.prisustva.length; j++){
        if(parseInt(nasPredmet.prisustva[j].sedmica)===parseInt(prisustvo.sedmica) && parseInt(nasPredmet.prisustva[j].index)===parseInt(parseInt(index))){
            indexZaAzuriranje=j;
            nasPredmet.prisustva[j].predavanja=prisustvo.predavanja;
            nasPredmet.prisustva[j].vjezbe=prisustvo.vjezbe;
            console.log('Ovo iz indeksa provjera ', prisustvaPredmeta[indexPredmeta]);
            prisustvaPredmeta[indexPredmeta].prisustva[j].predavanja=prisustvo.predavanja;
            prisustvaPredmeta[indexPredmeta].prisustva[j].vjezbe=prisustvo.vjezbe;
            break;
        }

        //u slucaju da moramo ddoati sedmicu i informacije o njoj
        if(j===nasPredmet.prisustva.length-1){
          nasPredmet.prisustva[j]
          prisustvaPredmeta[indexPredmeta].prisustva.splice(j+1, 0, { "sedmica": prisustvo.sedmica, "predavanja": prisustvo.predavanja, "vjezbe": prisustvo.vjezbe, "index": parseInt(index)});
        }
     }

    fs.writeFileSync(path.join(__dirname, 'data', 'prisustva.json'), JSON.stringify(prisustvaPredmeta, null, 2));
    //azuriranje jsona
    res.status(200).send(nasPredmet);
    //ovdje je sada potrebno da izmijenim podatke u json fajlu, vratim ih, i ponovo kasnije icrtam tabelu
})

app.listen(3000);