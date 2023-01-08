const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const app = express();


//index page
app.get('/', (req, res)=>{
    res.status(200).send("Spirala 3");
})


app.listen(3000);