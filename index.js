const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const app = express();

//to have an access to css files and other in public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

//index page - ovo nije trebalo al neka stoji jer je meni ljepse
app.get('/', (req, res)=>{
    res.status(200).send("Spirala 3");
})

//prijava page
app.get('/prijava(.html)?', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
})


//post ruta za login gdje provjeravamo ispravnost unijetih podataka
app.post('/login', (req, res)=>{
    const podaci = req.body;
    console.log(podaci);
    res.status(200).send('Everything is fine');
})


app.listen(3000);