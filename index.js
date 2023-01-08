const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const app = express();

//to have an access to css files and other in public folder
app.use(express.static(path.join(__dirname,'public')));

//index page
app.get('/', (req, res)=>{
    res.status(200).send("Spirala 3");
})

//prijava page
app.get('/prijava(.html)?', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'prijava.html'));
})


app.listen(3000);