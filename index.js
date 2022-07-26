const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');

const errorController = require('./controllers/error');

const db = require('./util/database');



var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(userRouter);
app.use(bookRouter);

app.use(errorController.get404Error);

app.listen(3005);


// add book data from json to db
/*
const books = require('./model/booksDetails');

books.forEach((book) => {
    setTimeout(()=>{
        db.execute(
            'INSERT INTO books (title, author, categories, pages) VALUES (?,?,?,?)',
            [book.title, book.author, book.categories, book.pages]
        ).then().catch(err=> {console.log(err)});
    }, 1000)
    
});
*/