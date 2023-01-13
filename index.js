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
    debugger
    const index = req.params.index;
    const naziv = req.params.naziv;
    const prisustvo = req.body; 
    let prisustvaPredmeta = fs.readFileSync(path.join(__dirname, 'data', 'prisustva.json'));
    prisustvaPredmeta = JSON.parse(prisustvaPredmeta);
    let indexPredmeta = 0;
     let nasPredmet = prisustvaPredmeta.filter(p=>{ if(p.predmet===naziv) return p; indexPredmeta++;});
     //ovo je ruzno al mora ovako sad za sad...ovo [0]
     let indexStudenta=0;
     let nasStudent = nasPredmet[0].prisustva.filter( o=>{if(o.index==index) return o; indexStudenta++});
     for(let i=0; i<nasStudent.length; i++){
        if(nasStudent[i].sedmica==prisustvo.sedmica){
            console.log('prije promjene predavanja: ', nasStudent[i].predavanja);
            nasStudent[i].predavanja=prisustvo.predavanja;
            console.log('poslije promjene predavanja: ', nasStudent[i].predavanja);
            console.log('prije promjene vjezbe: ', nasStudent[i].vjezbe);
            nasStudent[i].vjezbe=prisustvo.vjezbe;
            console.log('poslije promjene vjezbe: ', nasStudent[i].vjezbe);
            // console.log(nasStudent);
            break;
        }
     }
     
     for(let j=0; j<nasPredmet[0].prisustva.length; j++){
        if(nasPredmet[0].prisustva[j].sedmica==prisustvo.sedmica && nasPredmet[0].prisustva[j].index==index){
            nasPredmet[0].prisustva[j].predavanja=prisustvo.predavanja;
            nasPredmet[0].prisustva[j].vjezbe=prisustvo.vjezbe;
            break;
        }
     }
    res.status(200).send(nasPredmet[0]);
    //ovdje je sada potrebno da izmijenim podatke u json fajlu, vratim ih, i ponovo kasnije icrtam tabelu
})

app.listen(3000);