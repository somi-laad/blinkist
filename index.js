const express = require("express");
// const bodyParser = require("body-parser");

// const userRouter = require("./routes/user");
// const bookRouter = require("./routes/book");

// const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const Book = require('./model/book/books');

const Category = require('./model/book/category');

Book.hasMany(Category);

// var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(userRouter);
// app.use(bookRouter);

// app.use(errorController.get404Error);

// app.listen(3005);

//creates table for models
sequelize.sync()
    .then((result) => {

    }).catch(err => {
        console.log(err);
    });


