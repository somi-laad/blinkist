const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('../../routes/user');
const bookRouter = require('../../routes/book');

const errorController = require('../../controllers/error');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(userRouter);
app.use(bookRouter);

app.use(errorController.get404Error);

app.listen(3001);