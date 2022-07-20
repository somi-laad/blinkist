const express = require('express');
const bodyParser = require('body-parser');

const mainRouter = require('./routes/main');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(mainRouter);

app.listen(3001);