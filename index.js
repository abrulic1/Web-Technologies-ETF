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
 

//index page - ovo nije trebalo al neka stoji jer je meni ljepse
// app.get('/', (req, res)=>{
//     res.status(200).send("Spirala 3");
// })

//prijava page - - - 
app.get('/prijava(.html)?', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})

app.post('/login(.html)?', (req, res)=>{
    
    const data = fs.readFileSync(path.join(__dirname, 'data', 'nastavnici.json'));
    const users = JSON.parse(data);

    const user = users.find(objekat => objekat.nastavnik.username===req.body.username);
    if(user){
        // console.log(user["nastavnik"].username)
        // console.log(user["nastavnik"].password_hash)
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

app.listen(3000);